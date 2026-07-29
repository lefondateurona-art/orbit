/**
 * Test de NON-RÉGRESSION — course entre restauration et saisie.
 *
 * Bug corrigé le 2026-07-28 : au démarrage, la restauration de l'état depuis
 * Supabase pouvait écraser ce que l'utilisateur venait de saisir (puis
 * recharger la page), causant une perte de données.
 *
 * Scénario rejoué : une sauvegarde ANCIENNE existe côté Supabase, et
 * l'utilisateur écrit immédiatement au chargement. La saisie locale doit
 * gagner — et être répliquée.
 *
 * Usage : node test-bridge-regression.mjs
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const URL_SB = "https://vlqnywwhdrfoyqutmkpa.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscW55d3doZHJmb3lxdXRta3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MzkyMjcsImV4cCI6MjEwMDQxNTIyN30.nsVnUga2wq42-f6ipnmtUr0eiXfdP-QI_qMngHNfuvI";
const KEY = "orbit_admin_db";

const admin = createClient(URL_SB, ANON);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let fail = 0;
const check = (label, ok, detail = "") => {
  console.log(ok ? `  ✔ ${label}` : `  ✗ ÉCHEC : ${label} ${detail}`);
  if (!ok) fail++;
};

console.log("\n=== Non-régression : la saisie locale ne doit pas être écrasée ===\n");

// 1) Une sauvegarde ancienne existe déjà côté serveur.
await admin.from("app_state").upsert(
  { owner_id: "platform", app: KEY, data: { marker: "ANCIEN" }, updated_at: new Date().toISOString() },
  { onConflict: "owner_id,app" }
);
console.log("1) Sauvegarde ANCIENNE présente côté Supabase");

// 2) Environnement navigateur simulé.
class Storage {
  constructor() { this._m = new Map(); }
  getItem(k) { return this._m.has(k) ? this._m.get(k) : null; }
  setItem(k, v) { this._m.set(k, String(v)); }
  removeItem(k) { this._m.delete(k); }
}
globalThis.Storage = Storage;
globalThis.window = globalThis;
globalThis.localStorage = new Storage();
globalThis.sessionStorage = new Storage();
let reloaded = false;
globalThis.location = { reload() { reloaded = true; } };
window.localStorage = globalThis.localStorage;
window.POLARIS_SUPABASE = { url: URL_SB, anonKey: ANON };
const authStore = new Map();
window.supabase = {
  createClient: (u, k, o) =>
    createClient(u, k, {
      ...o,
      auth: { ...(o?.auth ?? {}), persistSession: true, storage: {
        getItem: (x) => authStore.get(x) ?? null,
        setItem: (x, v) => authStore.set(x, v),
        removeItem: (x) => authStore.delete(x),
      } },
    }),
};

// 3) Chargement du pont, puis saisie IMMÉDIATE (la course à reproduire).
new Function(readFileSync(new URL("../backoffice/public/polaris-supabase.js", import.meta.url), "utf8"))();
const NOUVEAU = JSON.stringify({ marker: "NOUVEAU", admins: [{ id: 1 }] });
localStorage.setItem(KEY, NOUVEAU);
console.log("2) L'utilisateur écrit NOUVEAU juste après le chargement");

await wait(3000);

// 4) Vérifications
console.log("3) Vérifications");
check("la saisie locale n'a pas été écrasée", localStorage.getItem(KEY) === NOUVEAU,
  `-> ${localStorage.getItem(KEY)}`);
check("pas de rechargement intempestif de la page", reloaded === false);

const res = await admin.from("app_state").select("data").eq("owner_id", "platform").eq("app", KEY).maybeSingle();
check("la saisie a bien été répliquée vers Supabase", res.data?.data?.marker === "NOUVEAU",
  JSON.stringify(res.data?.data));

console.log(`\n${fail === 0 ? "Non-régression OK" : fail + " échec(s)"}\n`);
process.exit(fail === 0 ? 0 : 1);

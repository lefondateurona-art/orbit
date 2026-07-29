/**
 * Banc de test des ponts Supabase d'ORBIT et du BACK-OFFICE.
 *
 * Ces ponts n'interceptent pas le réseau : ils interceptent les écritures
 * localStorage du prototype (orbit_prototype_db / orbit_admin_db) et les
 * répliquent dans la table `app_state` de Supabase. Ce script rejoue ce
 * mécanisme hors navigateur pour vérifier la réplication réelle.
 *
 * Usage : node test-bridge.mjs
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const URL_SB = "https://vlqnywwhdrfoyqutmkpa.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscW55d3doZHJmb3lxdXRta3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MzkyMjcsImV4cCI6MjEwMDQxNTIyN30.nsVnUga2wq42-f6ipnmtUr0eiXfdP-QI_qMngHNfuvI";

// --- faux environnement navigateur ---
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
globalThis.location = { reload() { /* rechargement neutralisé en test */ } };
window.localStorage = globalThis.localStorage;

const authStore = new Map();
window.POLARIS_SUPABASE = { url: URL_SB, anonKey: ANON };
window.supabase = {
  createClient: (u, k, o) =>
    createClient(u, k, {
      ...o,
      auth: {
        ...(o?.auth ?? {}),
        persistSession: true,
        storage: {
          getItem: (key) => authStore.get(key) ?? null,
          setItem: (key, v) => authStore.set(key, v),
          removeItem: (key) => authStore.delete(key),
        },
      },
    }),
};

let pass = 0, fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) { pass++; console.log(`  ✔ ${label}`); }
  else { fail++; console.log(`  ✗ ÉCHEC : ${label} ${detail}`); }
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const which = process.argv[2] === "backoffice" ? "backoffice" : "orbit";
const file = which === "backoffice"
  ? new URL("../backoffice/public/polaris-supabase.js", import.meta.url)
  : new URL("./public/polaris-supabase.js", import.meta.url);
const KEY = which === "backoffice" ? "orbit_admin_db" : "orbit_prototype_db";

console.log(`\n=== Pont ${which.toUpperCase()} (clé ${KEY}) ===\n`);

new Function(readFileSync(file, "utf8"))();
const sb = window.POLARIS_SB;
check("pont initialisé (client Supabase exposé)", !!sb);

// Le pont d'ORBIT ne réplique que pour un utilisateur connecté.
let scope = "platform";
if (which === "orbit") {
  const ts = Date.now();
  const email = `bridge.test.${ts}@gmail.com`;
  const r = await sb.auth.signUp({ email, password: "Test123456!", options: { data: { name: "Bridge Test" } } });
  check("compte de test connecté", !!r.data?.session, r.error?.message || "");
  scope = r.data?.user?.id;
  console.log(`  (compte ${email})`);
}

// --- écriture par le prototype ---
const marker = `test-${Date.now()}`;
const payload = JSON.stringify({ marker, companies: [{ id: 1, name: "Entreprise test" }] });
console.log("\n1) Le prototype écrit dans localStorage");
localStorage.setItem(KEY, payload);
check("écriture locale conservée", localStorage.getItem(KEY) === payload);

console.log("2) Réplication vers Supabase (anti-rebond ~800 ms)");
await wait(2500);
const res = await sb.from("app_state").select("data").eq("owner_id", scope).eq("app", which === "backoffice" ? KEY : "orbit").maybeSingle();
check("état retrouvé dans app_state", !!res.data, JSON.stringify(res.error || res.data));
check("contenu identique à l'original", res.data?.data?.marker === marker, JSON.stringify(res.data?.data));

console.log("3) Les autres clés ne sont PAS répliquées");
localStorage.setItem("cle_sans_rapport", "x");
await wait(1200);
const other = await sb.from("app_state").select("app").eq("app", "cle_sans_rapport");
check("clé étrangère ignorée", (other.data || []).length === 0);

console.log(`\nRésultat : ${pass} réussis, ${fail} échoués\n`);
if (which === "orbit") console.log(`NETTOYAGE : supprimer le compte bridge.test.*`);
process.exit(fail === 0 ? 0 : 1);

/* =====================================================================
   ORBIT — Pont Supabase (aucune modification du design).
   ---------------------------------------------------------------------
   Le prototype ORBIT stocke toute sa base dans localStorage
   ("orbit_prototype_db"). Ce script :
     1) charge cette base depuis Supabase au démarrage (multi-appareils),
     2) réplique chaque écriture locale vers Supabase (table app_state),
     3) expose window.POLARIS_SB pour l'auth réelle.
   Le HTML et le JS d'origine restent intacts.
   ===================================================================== */
(function () {
  "use strict";

  var CFG = window.POLARIS_SUPABASE || {};
  if (!CFG.url || !CFG.anonKey || !window.supabase) {
    console.warn("[ORBIT] Supabase non configuré — le prototype garde ses données locales.");
    return;
  }

  var DB_KEY = "orbit_prototype_db";
  var sb = window.supabase.createClient(CFG.url, CFG.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: "orbit_sb_auth" },
  });
  window.POLARIS_SB = sb;

  /* ---------- réplication de l'état applicatif ---------- */
  var saveTimer = null;
  var lastPushed = null;
  // Le prototype a-t-il déjà écrit depuis le chargement ? Si oui, la
  // restauration initiale ne doit pas écraser la saisie en cours.
  var localTouched = false;

  async function currentScope() {
    var u = (await sb.auth.getUser()).data.user;
    return u ? u.id : null; // état par compte connecté
  }

  async function pullState() {
    try {
      var scope = await currentScope();
      if (!scope) return; // pas connecté : on garde l'état local
      if (localTouched) return; // saisie locale en cours : elle fait foi
      var r = await sb.from("app_state").select("data").eq("owner_id", scope).eq("app", "orbit").maybeSingle();
      if (r.data && r.data.data) {
        var incoming = JSON.stringify(r.data.data);
        if (localTouched || window.localStorage.getItem(DB_KEY) === incoming) return;
        nativeSet.call(window.localStorage, DB_KEY, incoming);
        lastPushed = incoming;
        console.info("[ORBIT] état restauré depuis Supabase");
        // Le prototype lit localStorage au démarrage : on recharge une seule fois.
        if (!sessionStorage.getItem("orbit_state_pulled")) {
          sessionStorage.setItem("orbit_state_pulled", "1");
          location.reload();
        }
      }
    } catch (e) { console.warn("[ORBIT] restauration impossible", e); }
  }

  async function pushState() {
    try {
      var scope = await currentScope();
      if (!scope) return;
      var raw = window.localStorage.getItem(DB_KEY);
      if (!raw || raw === lastPushed) return;
      lastPushed = raw;
      await sb.from("app_state").upsert(
        { owner_id: scope, app: "orbit", data: JSON.parse(raw), updated_at: new Date().toISOString() },
        { onConflict: "owner_id,app" }
      );
    } catch (e) { console.warn("[ORBIT] sauvegarde impossible", e); }
  }

  // Intercepte les écritures du prototype pour déclencher la synchro.
  var nativeSet = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    nativeSet.call(this, k, v);
    if (k === DB_KEY) {
      localTouched = true;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(pushState, 800);
    }
  };

  sb.auth.onAuthStateChange(function (evt) {
    if (evt === "SIGNED_IN") pullState();
    if (evt === "SIGNED_OUT") sessionStorage.removeItem("orbit_state_pulled");
  });

  pullState();
  console.info("[ORBIT] Supabase branché ✔");
})();

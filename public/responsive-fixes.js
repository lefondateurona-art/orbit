/* =====================================================================
   ORBIT — Renfort responsive : enveloppe chaque <table> dans un conteneur
   défilable horizontalement. N'altère aucun contenu ni style existant —
   ajoute uniquement un wrapper autour des tableaux déjà présents dans le
   HTML d'origine, pour qu'ils défilent au lieu de faire déborder la page
   sur mobile (voir responsive-fixes.css .responsive-table-wrap).
   ===================================================================== */
(function () {
  "use strict";

  function wrapTables(root) {
    (root || document).querySelectorAll("table").forEach(function (table) {
      if (table.parentElement && table.parentElement.classList.contains("responsive-table-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "responsive-table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  function run() { wrapTables(document); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  // Le prototype reconstruit ses vues dynamiquement (innerHTML) à chaque
  // navigation : on ré-enveloppe les nouveaux tableaux au fil du temps,
  // avec un anti-rebond pour ne pas re-scanner à chaque micro-mutation.
  var pending = null;
  var mo = new MutationObserver(function () {
    clearTimeout(pending);
    pending = setTimeout(run, 150);
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

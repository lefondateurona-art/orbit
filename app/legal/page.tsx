"use client";

import { Icon } from "@/components/Icon";

/** Faithful port of the prototype LEGAL view (view-legal). */
export default function LegalView() {
  return (
    <section id="view-legal">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="file-text" /> Conditions générales d&apos;utilisation</h3>
            <p className="desc">Le cadre contractuel qui lie votre entreprise à ORBIT.</p>
          </div>
          <button className="btn btn-ghost btn-sm"><Icon name="download" /> Télécharger (.txt)</button>
        </div>
        <div className="legal-text">
          <p>1. <strong>Objet.</strong> ORBIT met à disposition une plateforme de gestion (ventes, stock, clients, boutique en ligne) contre un abonnement mensuel ou annuel.</p>
          <p>2. <strong>Essai gratuit.</strong> Un essai gratuit de 24 heures est offert à la création du compte. Passé ce délai, l&apos;accès aux fonctionnalités est suspendu tant qu&apos;un abonnement actif n&apos;est pas souscrit.</p>
          <p>3. <strong>Paiement.</strong> Les abonnements sont payables d&apos;avance via les moyens de paiement activés (Mobile Money, carte bancaire). Le renouvellement est automatique sauf résiliation.</p>
          <p>4. <strong>Données.</strong> Les données saisies (clients, ventes, produits) restent la propriété exclusive de l&apos;entreprise cliente et peuvent être exportées à tout moment.</p>
          <p>5. <strong>Responsabilité.</strong> ORBIT n&apos;intervient pas dans la relation commerciale entre l&apos;entreprise cliente et ses propres clients finaux.</p>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="alert-octagon" /> Politique de relance des impayés</h3>
            <p className="desc">Ce qui se passe lorsqu&apos;un client final ne règle pas sa facture ou son abonnement.</p>
          </div>
          <button className="btn btn-ghost btn-sm"><Icon name="download" /> Télécharger (.txt)</button>
        </div>
        <div className="legal-text">
          <p>1. <strong>Rappel à 48h.</strong> Si une commande n&apos;est pas réglée sous 48h, une relance automatique (si activée dans Automatisations) est envoyée par WhatsApp au client.</p>
          <p>2. <strong>Suspension à 7 jours.</strong> Passé 7 jours sans règlement, la commande est marquée « en attente de paiement » et peut être annulée par le gérant.</p>
          <p>3. <strong>Abonnement ORBIT impayé.</strong> Si l&apos;abonnement de l&apos;entreprise n&apos;est pas réglé à échéance, l&apos;accès au tableau de bord est suspendu (lecture seule) jusqu&apos;à régularisation, sans perte des données.</p>
          <p>4. <strong>Bonne foi.</strong> Toute contestation doit être signalée à l&apos;assistance ORBIT avant toute mesure de suspension définitive.</p>
        </div>
      </div>
    </section>
  );
}

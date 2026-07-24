"use client";

import { Icon } from "@/components/Icon";
import { money, mockOrbitInvoices } from "@/lib/mock-data";

/** Faithful port of the prototype FACTURES view (view-factures / renderInvoices). */
export default function FacturesView() {
  const invoices = mockOrbitInvoices;
  return (
    <section id="view-factures">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>
              <Icon name="file-invoice" /> Factures
            </h3>
            <p className="desc">
              Générez une facture normalisée pour vos grosses commandes, puis téléchargez-la en PDF pour
              l&apos;envoyer directement à votre client.
            </p>
          </div>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Nouvelle facture</button>
        </div>
        {invoices.length === 0 ? (
          <div className="empty-state">
            <Icon name="file-invoice" />
            <h4>Aucune facture pour le moment</h4>
            <p>
              Créez votre première facture pour une grosse commande et téléchargez-la en PDF à envoyer à
              votre client.
            </p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Client</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Montant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((f) => (
                <tr key={f.id}>
                  <td className="mono">{f.id}</td>
                  <td>{f.client}</td>
                  <td>{f.date}</td>
                  <td style={{ textAlign: "right" }}>{money(f.amount)}</td>
                  <td>
                    <div className="report-actions">
                      <button className="icon-btn-sm" title="Télécharger en PDF" aria-label="PDF">
                        <Icon name="file-download" />
                      </button>
                      <button className="icon-btn-sm whatsapp" title="Envoyer via WhatsApp" aria-label="WhatsApp">
                        <Icon name="brand-whatsapp" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

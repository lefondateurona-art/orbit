"use client";

import { Icon } from "@/components/Icon";
import { mockSuppliers } from "@/lib/mock-data";

/** Faithful port of the prototype FOURNISSEURS view (view-fournisseurs / renderSuppliers). */
export default function FournisseursView() {
  const suppliers = [...mockSuppliers].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section id="view-fournisseurs">
      <div className="panel">
        <div className="panel-head">
          <h3>Fournisseurs</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Ajouter un fournisseur</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Produits fournis</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={4}>Aucun fournisseur enregistré.</td>
              </tr>
            ) : (
              suppliers.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.phone || "—"}</td>
                  <td>{s.products || "—"}</td>
                  <td>{s.note || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

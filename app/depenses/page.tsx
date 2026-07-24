"use client";

import { Icon } from "@/components/Icon";
import { money, fmtDate, mockExpenses } from "@/lib/mock-data";

/** Faithful port of the prototype DÉPENSES view (view-depenses / renderDepenses). */
export default function DepensesView() {
  const expenses = [...mockExpenses].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return (
    <section id="view-depenses">
      <div className="panel">
        <div className="panel-head">
          <h3>Historique des dépenses</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Nouvelle dépense</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Description</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={4}>Aucune dépense enregistrée.</td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.category}</td>
                  <td>{e.description || "—"}</td>
                  <td>{fmtDate(e.createdAt)}</td>
                  <td style={{ textAlign: "right" }} className="tag-neg">
                    {money(e.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

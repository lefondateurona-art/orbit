"use client";

import { Icon } from "@/components/Icon";
import { mockAiChats } from "@/lib/mock-data";

/** Faithful port of the prototype MESSAGES IA view (view-aichats / renderAiChatsList). */
export default function MessagesIaView() {
  const chats = mockAiChats;
  const afterOrder = chats.filter((c) => c.channel === "Après commande").length;
  const free = chats.length - afterOrder;

  return (
    <section id="view-aichats">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="message-chatbot" /> Discussions avec l&apos;assistant IA</h3>
            <p className="desc">
              Chaque visiteur qui discute avec l&apos;assistant sur votre boutique — ou qui vient de
              commander — laisse ici une trace consultable.
            </p>
          </div>
        </div>
        <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 0 }}>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="messages" /> Discussions totales</div>
            <div className="kpi-value">{chats.length}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="shopping-cart" /> Après commande</div>
            <div className="kpi-value">{afterOrder}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="message-circle-2" /> Discussions libres</div>
            <div className="kpi-value">{free}</div>
          </div>
        </div>
      </div>
      <div className="panel">
        {chats.length === 0 ? (
          <div className="empty-state">
            <Icon name="message-chatbot" />
            <h4>Aucune discussion IA pour l&apos;instant</h4>
            <p>Dès qu&apos;un visiteur discute avec l&apos;assistant sur votre boutique, la conversation apparaît ici.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Téléphone</th>
                <th>Canal</th>
                <th>Dernier message</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {chats.map((c, i) => (
                <tr key={i}>
                  <td>{c.client}</td>
                  <td>{c.phone}</td>
                  <td>{c.channel}</td>
                  <td>{c.last}</td>
                  <td>{c.date}</td>
                  <td>
                    <button className="icon-btn-sm" title="Voir" aria-label="Voir">
                      <Icon name="eye" />
                    </button>
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

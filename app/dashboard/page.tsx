"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import {
  money,
  fmtDate,
  mockSales,
  mockExpenses,
  mockClients,
  mockGoals,
  totalCA,
  totalDep,
  totalBenef,
} from "@/lib/mock-data";

/** Faithful port of the prototype DASHBOARD view (view-dashboard /
 *  renderDashboard, renderGoals, renderPerf, mini calendar). */
export default function DashboardView() {
  const recent = [
    ...mockSales.map((s) => ({ type: "Vente" as const, desc: s.description, client: s.client, date: s.createdAt, amount: s.amount })),
    ...mockExpenses.map((e) => ({ type: "Dépense" as const, desc: e.description, client: "—", date: e.createdAt, amount: -e.amount })),
  ].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <section id="view-dashboard">
      <div className="dash-top-row">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="cash" /> Chiffre d&apos;affaires</div>
            <div className="kpi-value">{money(totalCA)}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="arrow-down-circle" /> Dépenses</div>
            <div className="kpi-value">{money(totalDep)}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="chart-line" /> Bénéfice net</div>
            <div className={`kpi-value ${totalBenef >= 0 ? "pos" : "neg"}`}>{money(totalBenef)}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="users" /> Clients</div>
            <div className="kpi-value">{mockClients.length}</div>
          </div>
        </div>

        <MiniCalendar />
      </div>

      <GoalsPanel />

      <PerfPanel />

      <div className="panel">
        <div className="panel-head">
          <h3>Transactions récentes</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm"><Icon name="minus" /> Dépense</button>
            <button className="btn btn-primary btn-sm"><Icon name="plus" /> Vente</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Client</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r, i) => (
              <tr key={i}>
                <td>
                  {r.type === "Vente" ? (
                    <>
                      <Icon name="arrow-up-circle" style={{ color: "var(--success)" }} /> Vente
                    </>
                  ) : (
                    <>
                      <Icon name="arrow-down-circle" style={{ color: "var(--danger)" }} /> Dépense
                    </>
                  )}
                </td>
                <td>{r.desc}</td>
                <td>{r.client}</td>
                <td>{fmtDate(r.date)}</td>
                <td style={{ textAlign: "right" }} className={r.amount < 0 ? "tag-neg" : "tag-pos"}>
                  {r.amount < 0 ? "− " : "+ "}
                  {money(Math.abs(r.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GoalsPanel() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const salesSince = (from: Date) =>
    mockSales.filter((s) => new Date(s.createdAt) >= from).reduce((a, s) => a + s.amount, 0);
  const sow = new Date(startOfDay);
  sow.setDate(startOfDay.getDate() - ((startOfDay.getDay() + 6) % 7));
  const som = new Date(startOfDay.getFullYear(), startOfDay.getMonth(), 1);
  const soy = new Date(startOfDay.getFullYear(), 0, 1);
  const periods = [
    { label: "Journalier", target: mockGoals.daily, current: salesSince(startOfDay) },
    { label: "Hebdomadaire", target: mockGoals.weekly, current: salesSince(sow) },
    { label: "Mensuel", target: mockGoals.monthly, current: salesSince(som) },
    { label: "Annuel", target: mockGoals.yearly, current: salesSince(soy) },
  ];
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3><Icon name="target-arrow" /> Objectifs</h3>
          <p className="desc">Votre progression par rapport à vos objectifs de chiffre d&apos;affaires.</p>
        </div>
        <button className="btn btn-ghost btn-sm"><Icon name="pencil" /> Modifier mes objectifs</button>
      </div>
      <div className="goals-grid">
        {periods.map((p) => {
          const pct = p.target > 0 ? Math.min(100, Math.round((p.current / p.target) * 100)) : 0;
          return (
            <div className="goal-card" key={p.label}>
              <h4>{p.label}</h4>
              <div className="goal-amounts">
                {money(p.current)} <span>/ {money(p.target)}</span>
              </div>
              <div className="goal-bar">
                <div className={`goal-bar-fill ${pct >= 100 ? "over" : ""}`} style={{ width: `${pct}%` }} />
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: 6 }}>{pct}% atteint</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PerfPanel() {
  const [tab, setTab] = useState<"jour-plus" | "jour-moins" | "rentabilite">("jour-plus");

  const map: Record<string, { ca: number; dep: number }> = {};
  mockSales.forEach((s) => {
    const d = s.createdAt.slice(0, 10);
    (map[d] ||= { ca: 0, dep: 0 }).ca += s.amount;
  });
  mockExpenses.forEach((e) => {
    const d = e.createdAt.slice(0, 10);
    (map[d] ||= { ca: 0, dep: 0 }).dep += e.amount;
  });
  const days = Object.keys(map).map((d) => ({ date: d, ca: map[d].ca, dep: map[d].dep, benefice: map[d].ca - map[d].dep }));

  let content: React.ReactNode = null;
  if (tab === "jour-plus") {
    const best = days.reduce((a, b) => (b.ca > a.ca ? b : a));
    content = (
      <div className="perf-summary">
        <div>
          <div className="ps-value" style={{ color: "var(--success)" }}>{money(best.ca)}</div>
          <div className="ps-label">Meilleur chiffre d&apos;affaires — {fmtDate(best.date)}</div>
        </div>
        <div>
          <div className="ps-value">{money(best.benefice)}</div>
          <div className="ps-label">Bénéfice ce jour-là</div>
        </div>
      </div>
    );
  } else if (tab === "jour-moins") {
    const worst = days.reduce((a, b) => (b.benefice < a.benefice ? b : a));
    content = (
      <div className="perf-summary">
        <div>
          <div className="ps-value" style={{ color: "var(--danger)" }}>{money(worst.benefice)}</div>
          <div className="ps-label">Plus faible bénéfice — {fmtDate(worst.date)}</div>
        </div>
        <div>
          <div className="ps-value">{money(worst.ca)}</div>
          <div className="ps-label">Chiffre d&apos;affaires ce jour-là</div>
        </div>
      </div>
    );
  } else {
    const tCa = days.reduce((s, d) => s + d.ca, 0);
    const tBen = days.reduce((s, d) => s + d.benefice, 0);
    const marge = tCa > 0 ? Math.round((tBen / tCa) * 100) : 0;
    content = (
      <div className="perf-summary">
        <div>
          <div className="ps-value" style={{ color: marge >= 20 ? "var(--success)" : marge >= 0 ? "var(--text)" : "var(--danger)" }}>
            {marge}%
          </div>
          <div className="ps-label">Marge nette globale</div>
        </div>
        <div>
          <div className="ps-value">{money(tBen)}</div>
          <div className="ps-label">Bénéfice cumulé</div>
        </div>
        <div>
          <div className="ps-value">{money(tCa)}</div>
          <div className="ps-label">Chiffre d&apos;affaires cumulé</div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-head"><h3>Synthèse de performance</h3></div>
      <div className="perf-tabs">
        <button type="button" className={`perf-tab ${tab === "jour-plus" ? "active" : ""}`} onClick={() => setTab("jour-plus")}>
          <Icon name="trending-up" /> Jour de performance
        </button>
        <button type="button" className={`perf-tab ${tab === "jour-moins" ? "active" : ""}`} onClick={() => setTab("jour-moins")}>
          <Icon name="trending-down" /> Jour de non-performance
        </button>
        <button type="button" className={`perf-tab ${tab === "rentabilite" ? "active" : ""}`} onClick={() => setTab("rentabilite")}>
          <Icon name="chart-donut-3" /> Rentabilité
        </button>
      </div>
      <div id="perf-content">{content}</div>
    </div>
  );
}

function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const saleDays = new Set(mockSales.map((s) => new Date(s.createdAt).getDate()));
  const cells: (number | null)[] = [
    ...Array(lead).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const monthLabel = now.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="mini-cal">
      <div className="mini-cal-head">
        <span className="mch-month">{monthLabel}</span>
        <div className="mini-cal-nav">
          <button type="button" aria-label="Mois précédent"><Icon name="chevron-left" /></button>
          <button type="button" aria-label="Mois suivant"><Icon name="chevron-right" /></button>
        </div>
      </div>
      <div className="mini-cal-dow">
        <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
      </div>
      <div className="mini-cal-grid">
        {cells.map((d, i) =>
          d === null ? (
            <div key={i} className="mini-cal-day blank" />
          ) : (
            <div
              key={i}
              className={[
                "mini-cal-day",
                saleDays.has(d) ? "has-sales" : d < now.getDate() ? "no-sales-past" : "",
                d === now.getDate() ? "today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {d}
            </div>
          )
        )}
      </div>
      <div className="mini-cal-legend">
        <span><i style={{ background: "var(--teal-soft)" }} /> Ventes</span>
        <span><i style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }} /> Aucune</span>
      </div>
      <div className="mc-period-row">
        <select defaultValue="7d">
          <option value="today">Aujourd&apos;hui</option>
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="month">Ce mois</option>
        </select>
      </div>
      <div className="mc-period-results">
        <div className="mc-pr-item"><span className="mc-pr-label">Chiffre d&apos;affaires</span><span className="mc-pr-value">{money(totalCA)}</span></div>
        <div className="mc-pr-item"><span className="mc-pr-label">Ventes</span><span className="mc-pr-value">{mockSales.length}</span></div>
        <div className="mc-pr-item"><span className="mc-pr-label">Bénéfice</span><span className="mc-pr-value">{money(totalBenef)}</span></div>
      </div>
    </div>
  );
}

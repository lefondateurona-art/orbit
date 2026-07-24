"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LANDING_HTML } from "@/lib/landing-html";
import { Icon } from "@/components/Icon";

/**
 * ORBIT marketing landing page — markup ported VERBATIM from the prototype
 * (#landing-view in orbit-site (26).html), rendered exactly. Reveal/counter
 * animations are ported here; the "Connexion" / "Essai gratuit" CTAs open the
 * faithful login/signup modals; "#tarifs" scrolls within the page.
 */
export default function LandingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [modal, setModal] = useState<null | "login" | "signup">(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const revealEls = Array.from(root.querySelectorAll<HTMLElement>(".reveal, [data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible", "revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));

    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = parseInt(el.getAttribute("data-count") || "0", 10);
      const dur = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    const onClick = (ev: MouseEvent) => {
      const t = (ev.target as HTMLElement).closest<HTMLElement>("[data-open-modal]");
      if (!t) return;
      const which = t.getAttribute("data-open-modal");
      if (which === "login" || which === "signup") {
        ev.preventDefault();
        setModal(which);
      }
    };
    root.addEventListener("click", onClick);
    return () => {
      io.disconnect();
      root.removeEventListener("click", onClick);
    };
  }, [router]);

  return (
    <>
      <div id="landing-view" ref={ref} dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSwitch={(m) => setModal(m)}
          onSuccess={() => router.push("/dashboard")}
        />
      )}
    </>
  );
}

/** Faithful port of the prototype #modal-login / #modal-signup (modal-split). */
function AuthModal({
  mode,
  onClose,
  onSwitch,
  onSuccess,
}: {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: (m: "login" | "signup") => void;
  onSuccess: () => void;
}) {
  return (
    <div className="modal-overlay show" style={{ display: "flex" }} onClick={onClose}>
      <div className="modal-box modal-split" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fermer">
          <Icon name="x" />
        </button>
        <div className="modal-visual" aria-hidden="true">
          <div className="mv-brand"><span className="dot" /> ORBIT</div>
          <div className="mv-illustration">
            <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="160" cy="205" rx="120" ry="16" fill="rgba(0,0,0,0.14)" />
              <polygon points="60,140 160,90 260,140 160,190" fill="rgba(255,255,255,0.14)" />
              <rect x="112" y="55" width="96" height="66" rx="6" fill="#fff" opacity="0.97" />
              <rect x="120" y="63" width="80" height="42" rx="3" fill="#EEF0FA" />
              <rect x="140" y="82" width="8" height="20" rx="1.5" fill="var(--gold)" />
              <rect x="152" y="74" width="8" height="28" rx="1.5" fill="var(--teal)" />
              <rect x="176" y="70" width="8" height="32" rx="1.5" fill="var(--gold)" />
              <circle cx="238" cy="88" r="22" fill="var(--gold)" />
              <text x="238" y="94" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle">₣</text>
              <circle cx="78" cy="102" r="16" fill="var(--teal)" />
              <path d="M70 102 l6 6 l12 -14" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mv-caption">
            {mode === "login" ? (
              <>
                <h4>Pilotez toute votre gestion, en un seul endroit.</h4>
                <p>Ventes, stock, clients et comptabilité — synchronisés en temps réel, avec les paiements Mobile Money d&apos;Afrique.</p>
              </>
            ) : (
              <>
                <h4>Rejoignez des centaines d&apos;entrepreneurs.</h4>
                <p>Démarrez gratuitement et découvrez une gestion pensée pour les réalités africaines.</p>
              </>
            )}
          </div>
        </div>
        <div className="modal-form-panel">
          {mode === "login" ? (
            <div id="login-content">
              <h3>Connexion à ORBIT</h3>
              <p className="modal-sub">Accédez à votre tableau de bord pour piloter votre activité.</p>
              <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
                <div className="form-group">
                  <label>Adresse e-mail</label>
                  <input type="email" placeholder="vous@entreprise.com" />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg"><Icon name="login-2" /> Se connecter</button>
              </form>
              <div className="modal-alt">
                Pas encore de compte ? <a onClick={() => onSwitch("signup")} style={{ cursor: "pointer" }}>Créer un compte gratuit</a>
              </div>
            </div>
          ) : (
            <div id="signup-content">
              <h3>Rejoignez ORBIT</h3>
              <p className="modal-sub">Créez votre compte en quelques secondes et démarrez votre essai.</p>
              <div className="plan-chip"><Icon name="rocket" /> <span>Offre : Découverte</span></div>
              <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input type="text" placeholder="Ex : Aïcha Koné" />
                </div>
                <div className="form-group">
                  <label>Nom de l&apos;entreprise</label>
                  <input type="text" placeholder="Ex : Gold Chicken" />
                </div>
                <div className="form-group">
                  <label>Adresse e-mail</label>
                  <input type="email" placeholder="vous@entreprise.com" />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" placeholder="6 caractères minimum" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg"><Icon name="rocket" /> Créer mon compte</button>
              </form>
              <div className="modal-alt">
                Déjà client ? <a onClick={() => onSwitch("login")} style={{ cursor: "pointer" }}>Se connecter</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

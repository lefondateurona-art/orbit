import { Icon } from "@/components/Icon";

/**
 * PUBLIC receipt-verification stub — no auth required.
 * TODO: replace the mock check below with a real Supabase query against the
 * `transactions` table: `select * from transactions where receipt_code = $1`.
 * If found, display amount/provider/date/status; if not, show "invalide".
 */
export default function VerifyReceiptPage({ params }: { params: { receiptCode: string } }) {
  const looksValid = /^ORB-(WAVE|OM)-[0-9A-Z]+-[0-9A-Z]{6}$/.test(params.receiptCode);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="card p-8">
        <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${looksValid ? "bg-teal-soft" : "bg-danger/10"}`}>
          <Icon name={looksValid ? "check" : "flag"} size={26} className={looksValid ? "text-teal-dark" : "text-danger"} />
        </div>
        <h1 className="text-[18px] mb-2">{looksValid ? "Reçu valide (format)" : "Reçu introuvable"}</h1>
        <p className="text-[13px] text-text-muted mb-4">Code : <code className="font-mono">{params.receiptCode}</code></p>
        <p className="text-[12px] text-text-muted">
          TODO : cette page vérifie uniquement le format du code pour l&apos;instant. Une fois Supabase branché,
          elle devra interroger la table <code>transactions</code> par <code>receipt_code</code> pour confirmer
          le montant, le fournisseur et le statut réels du paiement.
        </p>
      </div>
    </div>
  );
}

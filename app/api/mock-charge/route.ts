import { NextResponse } from "next/server";
import { paymentProviders } from "@/lib/payments";

/**
 * Demo route handler wiring the pricing page to the payment adapters
 * server-side (so real API keys, if ever configured, never reach the
 * browser). TODO: persist the returned receipt into the `transactions`
 * table (see supabase/migrations/0002_orbit.sql) once Supabase is wired.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { provider, amountFcfa, phone } = body as {
    provider: "wave" | "orange_money";
    amountFcfa: number;
    phone: string;
  };

  const adapter = paymentProviders[provider];
  if (!adapter) {
    return NextResponse.json({ error: "Fournisseur inconnu" }, { status: 400 });
  }

  try {
    const result = await adapter.charge({
      amountFcfa,
      customerPhone: phone,
      description: "Abonnement Orbit",
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Échec du paiement" }, { status: 500 });
  }
}

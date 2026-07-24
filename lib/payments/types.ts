/**
 * Common adapter interface for mobile-money payment providers (Wave,
 * Orange Money, ...). Each provider implements `charge()`. When the
 * required API keys are absent from the environment, providers run in a
 * clear MOCK mode (see wave.ts / orange-money.ts) that still produces a
 * real, uniquely verifiable receipt — meant to be persisted in the
 * `transactions` table (see supabase/migrations/0002_orbit.sql).
 */

export type ChargeRequest = {
  amountFcfa: number;
  currency?: "XOF";
  customerPhone: string;
  description: string;
  /** Free-form reference the caller can use to reconcile (subscription id, order id...) */
  reference?: string;
};

export type ChargeResult = {
  success: boolean;
  provider: "wave" | "orange_money";
  /** Whether this charge ran against the real provider API or a local mock */
  mode: "live" | "mock";
  /** Provider-side transaction id (or a generated mock id) */
  providerTransactionId: string;
  /** Unique, publicly verifiable code — store in transactions.receipt_code */
  receiptCode: string;
  amountFcfa: number;
  createdAt: string;
  message?: string;
};

export interface PaymentProvider {
  readonly id: "wave" | "orange_money";
  readonly name: string;
  readonly isLive: boolean;
  charge(request: ChargeRequest): Promise<ChargeResult>;
}

/**
 * Generates a short, human-shareable, unique-enough receipt code.
 * Format: ORB-<PROVIDER>-<base36 timestamp>-<random>
 */
export function generateReceiptCode(providerTag: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORB-${providerTag}-${ts}-${rand}`;
}

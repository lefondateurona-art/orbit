import type { ChargeRequest, ChargeResult, PaymentProvider } from "./types";
import { generateReceiptCode } from "./types";

/**
 * Orange Money adapter.
 *
 * Real integration TODO: call the Orange Money Web Payment API using
 * ORANGE_MONEY_API_KEY / ORANGE_MONEY_MERCHANT_ID once merchant credentials
 * are available (see SETUP_REQUIRED.md).
 *
 * Without those env vars, `charge()` runs in MOCK mode: it never calls any
 * network API, always "succeeds", and generates a real, unique
 * `receiptCode` so the rest of the app (receipt display, transactions
 * table) can be built and tested end-to-end today.
 */
class OrangeMoneyProvider implements PaymentProvider {
  readonly id = "orange_money" as const;
  readonly name = "Orange Money";
  readonly isLive = Boolean(process.env.ORANGE_MONEY_API_KEY && process.env.ORANGE_MONEY_MERCHANT_ID);

  async charge(request: ChargeRequest): Promise<ChargeResult> {
    const receiptCode = generateReceiptCode("OM");

    if (!this.isLive) {
      // MOCK MODE — no real API key configured.
      await new Promise((r) => setTimeout(r, 400)); // simulate network latency
      return {
        success: true,
        provider: "orange_money",
        mode: "mock",
        providerTransactionId: `mock_om_${Date.now()}`,
        receiptCode,
        amountFcfa: request.amountFcfa,
        createdAt: new Date().toISOString(),
        message: "Paiement simulé (mode MOCK) — aucune clé ORANGE_MONEY_API_KEY configurée.",
      };
    }

    // TODO(real-integration): replace with an actual fetch() call to the
    // Orange Money Web Payment API using process.env.ORANGE_MONEY_API_KEY.
    throw new Error("Intégration Orange Money réelle non implémentée — voir SETUP_REQUIRED.md");
  }
}

export const orangeMoneyProvider: PaymentProvider = new OrangeMoneyProvider();

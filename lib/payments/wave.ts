import type { ChargeRequest, ChargeResult, PaymentProvider } from "./types";
import { generateReceiptCode } from "./types";

/**
 * Wave (mobile money, Sénégal/Côte d'Ivoire) adapter.
 *
 * Real integration TODO: call the Wave Checkout API
 * (https://docs.wave.com) using WAVE_API_KEY / WAVE_MERCHANT_ID once
 * merchant credentials are available (see SETUP_REQUIRED.md).
 *
 * Without those env vars, `charge()` runs in MOCK mode: it never calls any
 * network API, always "succeeds", and generates a real, unique
 * `receiptCode` so the rest of the app (receipt display, transactions
 * table) can be built and tested end-to-end today.
 */
class WaveProvider implements PaymentProvider {
  readonly id = "wave" as const;
  readonly name = "Wave";
  readonly isLive = Boolean(process.env.WAVE_API_KEY && process.env.WAVE_MERCHANT_ID);

  async charge(request: ChargeRequest): Promise<ChargeResult> {
    const receiptCode = generateReceiptCode("WAVE");

    if (!this.isLive) {
      // MOCK MODE — no real API key configured.
      await new Promise((r) => setTimeout(r, 400)); // simulate network latency
      return {
        success: true,
        provider: "wave",
        mode: "mock",
        providerTransactionId: `mock_wave_${Date.now()}`,
        receiptCode,
        amountFcfa: request.amountFcfa,
        createdAt: new Date().toISOString(),
        message: "Paiement simulé (mode MOCK) — aucune clé WAVE_API_KEY configurée.",
      };
    }

    // TODO(real-integration): replace with an actual fetch() call to the
    // Wave Checkout API using process.env.WAVE_API_KEY.
    throw new Error("Intégration Wave réelle non implémentée — voir SETUP_REQUIRED.md");
  }
}

export const waveProvider: PaymentProvider = new WaveProvider();

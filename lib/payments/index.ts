import { waveProvider } from "./wave";
import { orangeMoneyProvider } from "./orange-money";
import type { PaymentProvider } from "./types";

export const paymentProviders: Record<"wave" | "orange_money", PaymentProvider> = {
  wave: waveProvider,
  orange_money: orangeMoneyProvider,
};

export * from "./types";

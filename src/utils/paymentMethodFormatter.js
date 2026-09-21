import {
  MdCreditCard,
  MdAccountBalance,
  MdLocalAtm,
  MdAccountBalanceWallet,
} from "react-icons/md";

/**
 * Static configuration for known payment gateways and methods.
 */
const PAYMENT_CONFIG = {
  stripe: {
    label: "Credit / Debit Card (Stripe)",
    subtitle: "Pay securely via Stripe",
    icon: MdCreditCard,
    badge: "Instant",
  },
  card: {
    label: "Credit / Debit Card",
    subtitle: "Pay using Visa, Mastercard, or RuPay",
    icon: MdCreditCard,
    badge: null,
  },
  upi: {
    label: "UPI Payment",
    subtitle: "GPay, PhonePe, Paytm, BHIM",
    icon: MdAccountBalance,
    badge: "Fastest",
  },
  cod: {
    label: "Cash on Delivery",
    subtitle: "Pay upon delivery",
    icon: MdLocalAtm,
    badge: null,
  },
};

export function getPaymentInfo(method) {
  if (!method) {
    return {
      label: "Not selected",
      subtitle: "Please select a payment method",
      icon: MdAccountBalanceWallet,
      badge: null,
    };
  }

  const key = method.toString().toLowerCase().trim();

  // Return pre-configured metadata if available
  if (PAYMENT_CONFIG[key]) {
    return PAYMENT_CONFIG[key];
  }

  // Fallback formatting for unconfigured/new gateways (e.g., "razorpay" -> "Razorpay")
  const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);

  return {
    label: formattedLabel,
    subtitle: `Pay securely using ${formattedLabel}`,
    icon: MdAccountBalanceWallet,
    badge: "Instant",
  };
}

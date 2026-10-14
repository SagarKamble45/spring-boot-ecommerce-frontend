import { CreditCard, Smartphone, Zap } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants & helpers                                                */
/* ------------------------------------------------------------------ */

export const STATUS_STYLES = {
  "Order Accepted": "bg-sky-50 text-sky-700",
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-indigo-50 text-indigo-700",
  Shipped: "bg-violet-50 text-violet-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-rose-50 text-rose-700",
};
// Dropdown order; any status that appears in the data but isn't listed is appended.
export const KNOWN_STATUSES = Object.keys(STATUS_STYLES);

export const PAYMENT_ICON = {
  "Credit Card": CreditCard,
  UPI: Smartphone,
  Razorpay: Zap,
  Stripe: CreditCard,
};

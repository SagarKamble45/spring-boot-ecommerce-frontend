import { CreditCard } from "lucide-react";
import { PAYMENT_ICON } from "./utils/orderConstants";

export default function PaymentLabel({ name }) {
  if (!name) {
    return <span className="text-slate-300">—</span>;
  }

  const Icon = PAYMENT_ICON[name] ?? CreditCard;

  return (
    <span className="inline-flex items-center gap-1.5 text-slate-600">
      <Icon className="h-4 w-4 text-slate-400" />
      {name}
    </span>
  );
}
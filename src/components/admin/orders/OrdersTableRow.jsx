import { ChevronRight } from "lucide-react";

import PaymentLabel from "./PaymentLabel";
import { StatusBadge } from "./StatusBadge";
import { formatAmount, formatDate } from "./utils/orderFormat";

export default function OrdersTableRow({
  order,
  isSelected,
  onToggleSelect,
  onOpen,
}) {
  return (
    <tr
      tabIndex={0}
      onClick={() => onOpen(order)}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          onOpen(order);
        }
      }}
      className={`cursor-pointer transition-colors focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
        isSelected ? "bg-blue-50/50" : "hover:bg-slate-50"
      }`}
    >
      <td className="py-2.5 pl-4" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(order.id)}
          aria-label={`Select order ${order.id}`}
          className="rounded border-slate-300"
        />
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 font-medium text-slate-800">
        #{order.id}
      </td>

      <td className="py-2.5 pr-4">
        <div className="font-medium capitalize text-slate-700">
          {order.UserName || order.email || "—"}
        </div>

        {order.UserName && (
          <div className="text-xs text-slate-400">{order.email}</div>
        )}
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 text-slate-500">
        {formatDate(order.orderDate)}
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 text-right font-medium tabular-nums text-slate-800">
        {formatAmount(order.totalAmount)}
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 pl-6">
        <PaymentLabel name={order.PgName} />
      </td>

      <td className="py-2.5 pr-4">
        <StatusBadge status={order.status} />
      </td>

      <td className="py-2.5 pr-4 text-slate-300">
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </td>
    </tr>
  );
}
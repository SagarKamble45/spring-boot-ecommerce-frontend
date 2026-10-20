import { STOCK_STATUS_STYLES } from "./ProductConstatnts";

export function StockBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${
        STOCK_STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "—"}
    </span>
  );
}
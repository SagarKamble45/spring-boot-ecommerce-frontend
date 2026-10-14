import { Search } from "lucide-react";

export default function OrdersToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  statusOptions,
  paymentFilter,
  onPaymentChange,
  paymentOptions,
  hasFilters,
  onClearFilters,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3">
      <div className="relative min-w-[200px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search order ID, name or email..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
        aria-label="Filter by status"
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status === "All" ? "All statuses" : status}
          </option>
        ))}
      </select>

      <select
        value={paymentFilter}
        onChange={(event) => onPaymentChange(event.target.value)}
        aria-label="Filter by payment method"
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {paymentOptions.map((payment) => (
          <option key={payment} value={payment}>
            {payment === "All" ? "All payment methods" : payment}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="px-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
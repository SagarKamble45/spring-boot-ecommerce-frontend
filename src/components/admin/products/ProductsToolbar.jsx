import { Search } from "lucide-react";

const selectClass =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100";

export default function ProductsToolbar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categoryOptions,
  statusFilter,
  onStatusChange,
  statusOptions,
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
          placeholder="Search products by name, category or ID..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
        className={selectClass}
      >
        {/* categoryOptions: [{ value, label }] - value is the category name */}
        {categoryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
        aria-label="Filter by stock status"
        className={selectClass}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status === "All" ? "All status" : status}
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
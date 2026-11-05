
import React from "react";

function DashboardOverview({
  title,
  amount,
  icon,
  revenue = false,
  loading = false,
}) {
  const numericAmount = Number(amount ?? 0);

  const formattedAmount = revenue
    ? `₹${numericAmount.toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`
    : numericAmount.toLocaleString("en-IN");

  if (loading && (amount === undefined || amount === null)) {
    return (
      <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-slate-100" />
          <div className="h-11 w-11 rounded-xl bg-slate-100" />
        </div>
        <div className="mb-3 h-8 w-32 rounded bg-slate-100" />
        <div className="h-3 w-24 rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg sm:p-6">

      {/* Subtle top accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" />

      {/* Card Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>
      </div>

      {/* Metric */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {formattedAmount}
          </h2>

          <p className="mt-2 text-xs font-medium text-slate-400">
            Overall store performance
          </p>
        </div>

        {loading && (
          <span className="mb-1 shrink-0 text-xs text-blue-500">
            Updating...
          </span>
        )}
      </div>

      {/* Decorative element */}
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-blue-50/70 transition-transform duration-500 group-hover:scale-150" />
    </div>
  );
}

export default DashboardOverview;

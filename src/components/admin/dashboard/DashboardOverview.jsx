
import React from "react";

function DashboardOverview({
  title,
  amount,
  icon,
  revenue = false,
  loading = false,
}) {
  if (loading && (amount === undefined || amount === null)) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-gray-100" />
          <div className="h-4 w-28 rounded bg-gray-100" />
        </div>
        <div className="h-8 w-32 rounded bg-gray-100" />
      </div>
    );
  }

  const numericAmount = Number(amount ?? 0);

  const formattedAmount = revenue
    ? `₹${numericAmount.toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`
    : numericAmount.toLocaleString("en-IN");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>

        <p className="text-gray-500 text-sm font-medium">
          {title}
        </p>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">
        {formattedAmount}
      </h2>

      {loading && (
        <p className="text-xs text-gray-400">
          Refreshing...
        </p>
      )}
    </div>
  );
}

export default DashboardOverview;

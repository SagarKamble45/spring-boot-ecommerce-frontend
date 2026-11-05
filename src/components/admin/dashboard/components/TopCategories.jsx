
import React from "react";
import { FolderOpen } from "lucide-react";
import FeatureError from "../../shared/FeatureError";

const COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-pink-500",
];

function TopCategories({
  categories = [],
  loading = false,
  error = null,
  onRetry,
  onViewAll,
}) {
  const topCategories = [...categories]
    .sort(
      (a, b) =>
        Number(b.productCount || 0) -
        Number(a.productCount || 0)
    )
    .slice(0, 5);

  const maxCount = Math.max(
    ...topCategories.map((item) =>
      Number(item.productCount || 0)
    ),
    1
  );

  return (
    <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Top Categories
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Products by category
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      {error && (
        <FeatureError
          title="Categories unavailable"
          message={String(error)}
          onRetry={onRetry}
          compact
        />
      )}

      {loading && categories.length === 0 ? (
        <div className="space-y-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse space-y-2">
              <div className="h-3 w-28 rounded bg-slate-100" />
              <div className="h-2 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      ) : topCategories.length > 0 ? (
        <div className="space-y-5">
          {topCategories.map((category, index) => {
            const count = Number(category.productCount || 0);
            const percentage = Math.round(
              (count / maxCount) * 100
            );

            return (
              <div key={category.categoryId}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium text-slate-700">
                    {category.categoryName}
                  </span>
                  <span className="text-sm text-slate-500">
                    {count}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${COLORS[index % COLORS.length]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center text-center">
          <FolderOpen size={28} className="mb-2 text-slate-300" />
          <p className="text-sm text-slate-500">
            No category data available
          </p>
        </div>
      )}
    </div>
  );
}

export default TopCategories;

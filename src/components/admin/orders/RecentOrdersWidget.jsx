
import { Package } from "lucide-react";
import formatTimeAgo from "./utils/formatTimeAgo";
import FeatureError from "../shared/FeatureError";

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-sky-50 text-sky-700",
  "Order Accepted !": "bg-sky-50 text-sky-700",
  Shipped: "bg-violet-50 text-violet-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
};

function RecentOrdersSkeleton() {
  return (
    <ul className="mt-3 divide-y divide-slate-100">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="flex items-center gap-3 py-2.5">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-100" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
        </li>
      ))}
    </ul>
  );
}

export default function RecentOrdersWidget({
  orders = [],
  loading = false,
  error = null,
  onRetry,
  onViewAll = () => {},
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Recent Orders
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      {error && orders.length === 0 ? (
        <div className="mt-3">
          <FeatureError
            title="Recent orders unavailable"
            message={String(error)}
            onRetry={onRetry}
            compact
          />
        </div>
      ) : loading && orders.length === 0 ? (
        <RecentOrdersSkeleton />
      ) : (
        <>
          {error && (
            <div className="mt-3">
              <FeatureError
                title="Unable to refresh recent orders"
                message={String(error)}
                onRetry={onRetry}
                compact
              />
            </div>
          )}

          <ul className="mt-3 divide-y divide-slate-100">
            {orders.map((order) => {
              const customerName =
                order.userName || order.email || "Unknown customer";

              return (
                <li
                  key={order.orderId}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                    <Package className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">
                      #{order.orderId} · ₹
                      {Number(order.totalAmount ?? 0).toLocaleString("en-IN")}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {customerName}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[order.orderStatus] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                    <span className="text-[11px] text-slate-400">
                      {formatTimeAgo(order.orderDate)}
                    </span>
                  </div>
                </li>
              );
            })}

            {orders.length === 0 && (
              <li className="py-6 text-center text-sm text-slate-400">
                No recent orders.
              </li>
            )}
          </ul>

          {loading && orders.length > 0 && (
            <p className="mt-2 text-xs text-slate-400">
              Refreshing recent orders...
            </p>
          )}
        </>
      )}
    </div>
  );
}

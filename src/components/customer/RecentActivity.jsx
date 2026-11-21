import { FaShoppingBag, FaHistory, FaCalendarAlt, FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyle = (status = "") => {
  const value = status.toLowerCase();

  if (value.includes("deliver")) {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (value.includes("cancel")) {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (value.includes("pending") || value.includes("process")) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  if (value.includes("ship") || value.includes("accept")) {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  return "bg-slate-50 text-slate-700 border-slate-200";
};

function RecentActivity({
  orders = [],
  loading = false,
  error = null,
  onRetry,
}) {
  const recentOrders = [...orders]
    .sort((a, b) => {
      return new Date(b.orderDate) - new Date(a.orderDate);
    })
    .slice(0, 5);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaHistory />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h2>

            <p className="text-sm text-slate-500">
              Your latest order activity.
            </p>
          </div>
        </div>

        <Link
          to="/my-orders"
          className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          All Orders →
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-3 text-sm text-slate-500">
            Loading recent activity...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm font-semibold text-red-700">
            Unable to load recent activity
          </p>

          <p className="mt-1 text-sm text-red-600">{String(error)}</p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && recentOrders.length === 0 && (
        <div className="py-10 text-center">
          <FaHistory className="mx-auto text-3xl text-slate-300" />

          <p className="mt-3 text-sm font-semibold text-slate-600">
            No recent activity
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your recent orders will appear here.
          </p>
        </div>
      )}

      {/* Recent Orders */}
      {!loading && !error && recentOrders.length > 0 && (
        <div className="space-y-5">
          {recentOrders.map((order, index) => (
            <div key={order.orderId} className="flex gap-4">
              {/* Activity Icon */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaShoppingBag />
                </div>

                {index !== recentOrders.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-slate-200" />
                )}
              </div>

              {/* Activity Details */}
              <div className="min-w-0 flex-1 pb-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      Order #{order.orderId}
                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <FaCalendarAlt />
                      {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus || "Status unavailable"}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FaBox />
                    {order.orderItems?.length || 0} items
                  </span>

                  <span className="font-semibold text-slate-800">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentActivity;

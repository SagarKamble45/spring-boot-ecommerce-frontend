import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DEFAULT_COLORS = {
  Delivered: "#10B981",
  Processing: "#3B82F6",
  Shipped: "#8B5CF6",
  Pending: "#F59E0B",
  Cancelled: "#EF4444",
};

export default function OrderStatusOverview({ orderStats = {} }) {
  const rawStatuses = [
    { label: "Delivered", count: orderStats?.deliveredOrders },
    { label: "Processing", count: orderStats?.processedOrders },
    { label: "Shipped", count: orderStats?.shippedOrders },
    { label: "Pending", count: orderStats?.pendingOrders },
    { label: "Cancelled", count: orderStats?.cancelledOrders },
  ];

  const statuses = rawStatuses.map((status) => ({
    ...status,
    count: Number(status.count ?? 0),
  }));

  const computedTotal = Number(orderStats?.totalOrders ?? 0);

  const data = statuses.map((status) => ({
    ...status,
    percent: computedTotal
      ? Math.round((status.count / computedTotal) * 100)
      : 0,
    color: DEFAULT_COLORS[status.label] ?? "#94A3B8",
  }));

  // Recharts should only receive slices with a positive value.
  const chartData = data.filter((status) => status.count > 0);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        Order Status Overview
      </h2>

      <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row xl:flex-col">
        <div className="relative h-36 w-36 shrink-0">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="label"
                  innerRadius="68%"
                  outerRadius="100%"
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              No status data
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-slate-900">
              {computedTotal}
            </span>
            <span className="text-xs text-slate-400">Total Orders</span>
          </div>
        </div>

        <ul className="w-full flex-1 space-y-2">
          {data.map((status) => (
            <li
              key={status.label}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                {status.label}
              </span>

              <span className="whitespace-nowrap text-slate-500">
                {status.count}{" "}
                <span className="text-slate-400">({status.percent}%)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
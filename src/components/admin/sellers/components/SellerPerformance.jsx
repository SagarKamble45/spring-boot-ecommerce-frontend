
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SELLER_COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const SellerPerformance = ({ performanceData = [] }) => {
  const data = performanceData
    .map((seller) => ({
      ...seller,
      totalSales: Number(seller.totalSales ?? 0),
    }))
    .filter((seller) => seller.totalSales > 0);

  const totalSales = data.reduce(
    (total, seller) => total + seller.totalSales,
    0
  );

  const chartData = data.map((seller, index) => ({
    ...seller,
    percent: Math.round((seller.totalSales / totalSales) * 100),
    color: SELLER_COLORS[index % SELLER_COLORS.length],
  }));

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Seller Performance
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Sales contribution by seller
        </p>
      </div>

      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row xl:flex-col">
        {/* Donut Chart */}
        <div className="relative h-40 w-40 shrink-0">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="totalSales"
                  nameKey="sellerName"
                  innerRadius="68%"
                  outerRadius="100%"
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {chartData.map((seller, index) => (
                    <Cell
                      key={`${seller.sellerName}-${index}`}
                      fill={seller.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              No sales data
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(totalSales)}
            </span>
            <span className="text-xs text-slate-400">
              Total Sales
            </span>
          </div>
        </div>

        {/* Seller Legend */}
        <ul className="w-full flex-1 space-y-3">
          {chartData.length > 0 ? (
            chartData.map((seller, index) => (
              <li
                key={`${seller.sellerName}-${index}`}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: seller.color }}
                  />
                  <span className="truncate text-sm text-slate-600">
                    {seller.sellerName}
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-slate-700">
                    {seller.percent}%
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatCurrency(seller.totalSales)}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-sm text-slate-400">
              No seller performance data available.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SellerPerformance;

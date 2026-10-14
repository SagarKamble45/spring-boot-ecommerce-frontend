import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SalesOverview({ salesData = [] }) {
  const [period, setPeriod] = useState("All Time");

  // -----------------------------
  // Format currency
  // -----------------------------
  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }

    return `₹${Math.round(value)}`;
  };

  // -----------------------------
  // Filter + format data
  // -----------------------------
  const formattedData = useMemo(() => {
    if (!salesData?.length) return [];

    // Sort by date first
    const sortedData = [...salesData].sort(
      (a, b) => new Date(a.day) - new Date(b.day)
    );

    let filteredData = sortedData;

    const latestDate = new Date(sortedData[sortedData.length - 1].day);

    if (period === "Last 7 Days") {
      const startDate = new Date(latestDate);
      startDate.setDate(startDate.getDate() - 6);

      filteredData = sortedData.filter((item) => {
        const date = new Date(item.day);
        return date >= startDate && date <= latestDate;
      });
    }

    if (period === "Last 30 Days") {
      const startDate = new Date(latestDate);
      startDate.setDate(startDate.getDate() - 29);

      filteredData = sortedData.filter((item) => {
        const date = new Date(item.day);
        return date >= startDate && date <= latestDate;
      });
    }

    return filteredData.map((item) => {
      const dateObj = new Date(item.day);

      return {
        day: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        sales: Math.round(Number(item.sales) * 100) / 100,
      };
    });
  }, [salesData, period]);

  // -----------------------------
  // Custom Tooltip
  // -----------------------------
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0].payload;

    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3">
        <p className="text-xs text-gray-400 mb-1">{data.fullDate}</p>

        <p className="text-lg font-semibold text-gray-900">
          ₹
          {Number(data.sales).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <p className="text-xs text-gray-400 mt-1">Total Sales</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Track your sales performance
          </p>
        </div>

        {/* Period Selector */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="
            appearance-none
            bg-white
            border
            border-gray-200
            rounded-xl
            px-4
            py-2
            pr-9
            text-sm
            font-medium
            text-gray-600
            outline-none
            cursor-pointer
            hover:border-gray-300
            focus:ring-2
            focus:ring-blue-100
            focus:border-blue-400
          "
        >
          <option>All Time</option>
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px]">

        {formattedData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                No sales data available
              </p>

              <p className="text-gray-300 text-xs mt-1">
                Sales will appear here once available
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity={0.22}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563eb"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              {/* Grid */}
              <CartesianGrid
                stroke="#eef2f7"
                strokeDasharray="4 4"
                vertical={false}
              />

              {/* X Axis */}
              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />

              {/* Y Axis */}
              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrency}
                width={60}
              />

              {/* Tooltip */}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#dbeafe",
                  strokeWidth: 1,
                }}
              />

              {/* Sales Area */}
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#salesGradient)"
                activeDot={{
                  r: 6,
                  stroke: "#ffffff",
                  strokeWidth: 3,
                  fill: "#2563eb",
                }}
                dot={{
                  r: 4,
                  stroke: "#ffffff",
                  strokeWidth: 2,
                  fill: "#2563eb",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default SalesOverview;
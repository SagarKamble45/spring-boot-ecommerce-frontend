
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
import { RefreshCw } from "lucide-react";

import FeatureError from "../shared/FeatureError";

function SalesOverview({
  salesData = [],
  loading = false,
  error = null,
  onRetry,
}) {
  const [period, setPeriod] = useState("All Time");

  // Format currency
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

  // Filter and format data
  const formattedData = useMemo(() => {
    if (!salesData?.length) return [];

    const sortedData = [...salesData].sort(
      (a, b) => new Date(a.day) - new Date(b.day)
    );

    let filteredData = sortedData;

    const latestDate = new Date(
      sortedData[sortedData.length - 1].day + "T00:00:00"
    );

    if (period === "Last 7 Days") {
      const startDate = new Date(latestDate);
      startDate.setDate(startDate.getDate() - 6);

      filteredData = sortedData.filter((item) => {
        const date = new Date(item.day + "T00:00:00");
        return date >= startDate && date <= latestDate;
      });
    }

    if (period === "Last 30 Days") {
      const startDate = new Date(latestDate);
      startDate.setDate(startDate.getDate() - 29);

      filteredData = sortedData.filter((item) => {
        const date = new Date(item.day + "T00:00:00");
        return date >= startDate && date <= latestDate;
      });
    }

    return filteredData.map((item) => {
      const dateObj = new Date(item.day + "T00:00:00");

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

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0].payload;

    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3">
        <p className="text-xs text-gray-400 mb-1">
          {data.fullDate}
        </p>

        <p className="text-lg font-semibold text-gray-900">
          ₹
          {Number(data.sales).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Total Sales
        </p>
      </div>
    );
  };

  // Initial loading skeleton
  const SalesChartSkeleton = () => (
    <div className="h-[320px] w-full animate-pulse flex flex-col justify-end">
      <div className="flex-1 flex items-end gap-3 px-4 pb-8">
        {[35, 55, 40, 75, 50, 85, 65, 45, 70, 90].map(
          (height, index) => (
            <div
              key={index}
              className="flex-1 bg-gray-100 rounded-t-md"
              style={{ height: `${height}%` }}
            />
          )
        )}
      </div>

      <div className="h-3 bg-gray-100 rounded w-full" />
    </div>
  );

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

        <div className="flex items-center gap-2">

          {/* Period Selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 outline-none cursor-pointer hover:border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          >
            <option>All Time</option>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
          </select>

          {/* Sales Refresh Button */}
          <button
            type="button"
            onClick={onRetry}
            disabled={loading}
            title="Refresh sales data"
            aria-label="Refresh sales data"
            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4">
          <FeatureError
            title="Unable to load sales overview"
            message={String(error)}
            onRetry={onRetry}
            compact
          />
        </div>
      )}

      {/* Chart */}
      <div className="w-full h-[320px]">

        {/* Initial loading */}
        {loading && !salesData.length ? (
          <SalesChartSkeleton />
        ) : formattedData.length === 0 ? (

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

              <CartesianGrid
                stroke="#eef2f7"
                strokeDasharray="4 4"
                vertical={false}
              />

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

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#dbeafe",
                  strokeWidth: 1,
                }}
              />

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

      {/* Background refresh indicator */}
      {loading && salesData.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          Refreshing sales data...
        </p>
      )}
    </div>
  );
}

export default SalesOverview;

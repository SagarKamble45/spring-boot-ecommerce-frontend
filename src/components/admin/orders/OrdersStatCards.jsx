
import {
  ShoppingCart,
  IndianRupee,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

import { StatCard } from "./StatsCard";

function StatsSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[170px] flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />
            <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="mt-4 h-6 w-20 animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function OrdersStatCards({
  orderStats,
  loading = false,
}) {
  const hasStats = Object.keys(orderStats ?? {}).length > 0;

  if (loading && !hasStats) {
    return <StatsSkeleton />;
  }

  const totalOrders = Number(orderStats?.totalOrders ?? 0);
  const totalRevenue = Number(orderStats?.TotalRevenue ?? 0);
  const pendingOrders = Number(orderStats?.pendingOrders ?? 0);
  const shippedOrders = Number(orderStats?.shippedOrders ?? 0);
  const cancelledOrders = Number(orderStats?.cancelledOrders ?? 0);

  const currency = (value) =>
    `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString("en-IN"),
      icon: ShoppingCart,
      iconBg: "#EFF6FF",
      iconColor: "#3B82F6",
    },
    {
      title: "Total Revenue",
      value: currency(totalRevenue),
      icon: IndianRupee,
      iconBg: "#ECFDF5",
      iconColor: "#10B981",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toLocaleString("en-IN"),
      icon: Clock,
      iconBg: "#F5F3FF",
      iconColor: "#8B5CF6",
    },
    {
      title: "Shipped Orders",
      value: shippedOrders.toLocaleString("en-IN"),
      icon: Truck,
      iconBg: "#ECFEFF",
      iconColor: "#06B6D4",
    },
    {
      title: "Cancelled Orders",
      value: cancelledOrders.toLocaleString("en-IN"),
      icon: XCircle,
      iconBg: "#FEF2F2",
      iconColor: "#EF4444",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

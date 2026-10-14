import { ShoppingCart, IndianRupee, Clock, Truck, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { StatCard } from "./StatsCard";
import { useEffect } from "react";
import { fetchOrderStats } from "../../../store/action";

export default function OrdersStatCards({orderStats}) {

//   const dispatch = useDispatch();

//     useEffect(() => {
//   dispatch(fetchOrderStats());
// }, [dispatch]);

  const totalOrders = Number(orderStats?.totalOrders ?? 0);
  const totalRevenue = Number(orderStats?.TotalRevenue ?? 0);
  const pendingOrders = Number(orderStats?.pendingOrders ?? 0);
  const shippedOrders = Number(orderStats?.shippedOrders ?? 0);
  const cancelledOrders = Number(orderStats?.cancelledOrders ?? 0);

  const currency = (n) =>
    `₹${n.toLocaleString("en-IN", {
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

import {
  UsersRound,
  UserCheck,
  UserX,
  ShoppingBag,
} from "lucide-react";

import CustomerStatsCard from "./CustomerStatsCard";

const CustomerStats = ({
  totalCustomers = 0,
  activeCustomers = 0,
  inactiveCustomers = 0,
  totalOrders = 0,
}) => {
  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: UsersRound,
      color: "blue",
      subtitle: "Registered customers",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      icon: UserCheck,
      color: "green",
      subtitle: "Currently active",
    },
    {
      title: "Inactive Customers",
      value: inactiveCustomers,
      icon: UserX,
      color: "red",
      subtitle: "Purchasing restricted",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "purple",
      subtitle: "Orders placed by customers",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <CustomerStatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default CustomerStats;

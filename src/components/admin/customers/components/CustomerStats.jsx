
import {
  UsersRound,
  UserCheck,
  UserX,
  ShoppingBag,
} from "lucide-react";

import CustomerStatsCard from "./CustomerStatsCard";
import FeatureError from "../../shared/FeatureError";

const CustomerStatsSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <div className="h-11 w-11 rounded-xl bg-slate-200" />

    <div className="mt-4 space-y-3">
      <div className="h-4 w-28 rounded bg-slate-200" />
      <div className="h-7 w-16 rounded bg-slate-200" />
      <div className="h-3 w-32 rounded bg-slate-100" />
    </div>
  </div>
);

const CustomerStats = ({
  totalCustomers = 0,
  activeCustomers = 0,
  inActiveCustomers = 0,
  totalOrders = 0,
  loading = false,
  error = null,
  onRetry,
}) => {
  if (loading) {
    return (
      <section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CustomerStatsSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <FeatureError
          title="Unable to load customer statistics"
          message={error}
          onRetry={onRetry}
          compact
        />
      </section>
    );
  }

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
      value: inActiveCustomers,
      icon: UserX,
      color: "red",
      subtitle: "Currently inactive",
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

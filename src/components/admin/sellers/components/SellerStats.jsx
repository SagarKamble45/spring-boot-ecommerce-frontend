
import {
  UsersRound,
  UserCheck,
  UserX,
  Package,
} from "lucide-react";

import SellerStatsCard from "./SellerStatsCard";

const SellerStatsSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <div className="h-11 w-11 rounded-xl bg-slate-200"/>

    <div className="mt-4 space-y-3">
      <div className="h-4 w-28 rounded bg-slate-200"/>
      <div className="h-7 w-16 rounded bg-slate-200" />
      <div className="h-3 w-32 rounded bg-slate-100" />
    </div>
  </div>
);

const SellerStats = ({
  totalSellers = 0,
  activeSellers = 0,
  inactiveSellers = 0,
  totalProducts = 0,
  loading = false,
}) => {
    if (loading) {
      return (
        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({length:4}).map((_, index) => (
            <SellerStatsSkeleton key={index} />
          ))}
          </div>
        </section>
      );
    }
    return(
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SellerStatsCard
          title="Total Sellers"
          value={loading ? "—" : totalSellers}
          icon={UsersRound}
          color="blue"
          subtitle="Registered sellers"
        />

        <SellerStatsCard
          title="Active Sellers"
          value={loading ? "—" : activeSellers}
          icon={UserCheck}
          color="green"
          subtitle="Currently active"
        />

        <SellerStatsCard
          title="Inactive Sellers"
          value={loading ? "—" : inactiveSellers}
          icon={UserX}
          color="red"
          subtitle="Currently inactive"
        />

        <SellerStatsCard
          title="Total Products"
          value={loading ? "—" : totalProducts}
          icon={Package}
          color="purple"
          subtitle="Products listed by sellers"
        />
      </div>
    </section>
  );
};

export default SellerStats;

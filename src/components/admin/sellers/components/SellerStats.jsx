import { UsersRound, UserCheck, UserX, Star } from "lucide-react";
import SellerStatsCard from "./SellerStatsCard";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

const SellerStats = ({
  totalSellers = 0,
  activeSellers = 0,
  inactiveSellers = 0,
  topSellerName = "No seller yet",
  topSellerSales = 0,
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SellerStatsCard
          title="Total Sellers"
          value={totalSellers}
          icon={UsersRound}
          color="blue"
          subtitle="Registered sellers"
        />

        <SellerStatsCard
          title="Active Sellers"
          value={activeSellers}
          icon={UserCheck}
          color="green"
          subtitle="Currently active"
        />

        <SellerStatsCard
          title="Inactive Sellers"
          value={inactiveSellers}
          icon={UserX}
          color="red"
          subtitle="Currently inactive"
        />

        <SellerStatsCard
          title="Top Seller"
          value={topSellerName}
          icon={Star}
          color="purple"
          subtitle={`${formatCurrency(topSellerSales)} total sales`}
        />
      </div>
    </section>
  );
};

export default SellerStats;
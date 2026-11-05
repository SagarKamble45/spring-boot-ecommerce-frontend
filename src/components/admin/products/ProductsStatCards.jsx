
import { Package, ShoppingCart, PackageX, Tags } from "lucide-react";
import { ProductStatCard } from "./ProductStatcard";

function ProductStatsSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[190px] flex-1 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
          </div>
          <div className="mt-4 h-7 w-16 animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function ProductsStatCards({
  productStats,
  loading = false,
}) {
  if (loading && Object.keys(productStats ?? {}).length === 0) {
    return <ProductStatsSkeleton />;
  }

  const formatCount = (value) =>
    Number(value ?? 0).toLocaleString("en-IN");

  const stats = [
    {
      title: "Total Products",
      value: formatCount(productStats?.totalProducts),
      icon: Package,
      iconBg: "#DBEAFE",
      iconColor: "#2563EB",
      tint: "#F5F9FF",
    },
    {
      title: "Active Products",
      value: formatCount(productStats?.totalActiveProducts),
      icon: ShoppingCart,
      iconBg: "#D1FAE5",
      iconColor: "#059669",
      tint: "#F3FBF7",
    },
    {
      title: "Out of Stock",
      value: formatCount(productStats?.totalOutOfStockProducts),
      icon: PackageX,
      iconBg: "#FEE2E2",
      iconColor: "#EF4444",
      tint: "#FFF6F6",
    },
    {
      title: "Total Categories",
      value: formatCount(productStats?.totalCategories),
      icon: Tags,
      iconBg: "#EDE9FE",
      iconColor: "#7C3AED",
      tint: "#F8F5FF",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <ProductStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

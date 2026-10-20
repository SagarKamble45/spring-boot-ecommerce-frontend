import { Package, ShoppingCart, PackageX, Tags } from "lucide-react";
import { ProductStatCard } from "./ProductStatcard";

/**
 * productStats: {
 *   totalProducts,
 *   totalActiveProducts,
 *   totalOutOfStockProducts,
 *   totalCategories
 * }
 */
export default function ProductsStatCards({ productStats }) {
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

import {
  LayoutGrid,
  Package,
  CirclePause,
  Tag,
} from "lucide-react";

const CategoryStatsSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 space-y-3">
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="h-8 w-16 rounded bg-slate-200" />
        <div className="h-3 w-32 rounded bg-slate-100" />
      </div>

      <div className="h-11 w-11 rounded-xl bg-slate-200" />
    </div>
  </div>
);

function CategoryStats({
  totalCategories = 0,
  activeCategories = 0,
  inactiveCategories = 0,
  topCategory = null,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CategoryStatsSkeleton key={index} />
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      subtitle: "All product categories",
      icon: LayoutGrid,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Categories",
      value: activeCategories,
      subtitle: "Currently active",
      icon: Package,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Inactive Categories",
      value: inactiveCategories,
      subtitle: "Currently inactive",
      icon: CirclePause,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Top Category",
      value: topCategory?.categoryName ?? "—",
      subtitle:
        topCategory != null
          ? `${topCategory.productCount ?? 0} products`
          : "No categories available",
      icon: Tag,
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p
                  className={`mt-3 truncate font-bold text-slate-900 ${
                    stat.title === "Top Category"
                      ? "text-xl"
                      : "text-3xl"
                  }`}
                >
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.subtitle}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryStats;

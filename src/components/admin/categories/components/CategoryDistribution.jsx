
import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChartNoAxesCombined,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Layers3,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import {
  CATEGORY_COLORS,
  getCategoryName,
  getTotalProducts,
} from "../utils/categoryHelpers";

const OTHER_COLOR = "#94A3B8";
const PAGE_SIZE = 8;

function CategoryDistribution({
  categories = [],
  loading = false,
  error = null,
  onRetry,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Protect against an unexpected API response shape.
  const safeCategories = Array.isArray(categories) ? categories : [];

  const totalProducts = getTotalProducts(safeCategories);

  // Sort categories by product count, highest first.
  const sortedCategories = useMemo(() => {
    return safeCategories
      .map((category) => ({
        ...category,
        name: getCategoryName(category) || "Unnamed category",
        value: Math.max(0, Number(category.productCount) || 0),
        id: category.categoryId ?? category.id,
      }))
      .sort((a, b) => b.value - a.value);
  }, [safeCategories]);

  // Only categories containing products participate in the chart.
  const categoriesWithProducts = sortedCategories.filter(
    (category) => category.value > 0
  );

  const topCategories = categoriesWithProducts.slice(0, 5);
  const remainingCategories = categoriesWithProducts.slice(5);

  const otherProducts = remainingCategories.reduce(
    (total, category) => total + category.value,
    0
  );

  const chartData = [
    ...topCategories.map((category, index) => ({
      ...category,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    })),
    ...(otherProducts > 0
      ? [
          {
            id: "other-categories",
            name: "Other categories",
            value: otherProducts,
            color: OTHER_COLOR,
          },
        ]
      : []),
  ];

  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedCategories = filteredCategories.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const openModal = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setIsModalOpen(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Category Distribution
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Products across categories
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ChartNoAxesCombined size={20} />
          </div>
        </div>

        {/* Donut chart */}
        <div className="relative mt-4 h-48 w-full">
          {loading ? (
            <div className="flex h-full items-center justify-center gap-2 text-sm text-slate-500">
              <LoaderCircle size={20} className="animate-spin" />
              Loading distribution...
            </div>
          ) : error ? (
            <div
              role="alert"
              className="flex h-full flex-col items-center justify-center gap-3 text-center"
            >
              <ChartNoAxesCombined
                size={28}
                className="text-rose-400"
              />

              <p className="text-sm text-rose-600">
                Unable to load category distribution.
              </p>

              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                >
                  <RefreshCw size={15} />
                  Retry
                </button>
              )}
            </div>
          ) : totalProducts > 0 && chartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="88%"
                    paddingAngle={2}
                    stroke="none"
                  >
                    {chartData.map((category) => (
                      <Cell
                        key={category.id ?? category.name}
                        fill={category.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      `${value} products`,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">
                  {totalProducts}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  Total Products
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-sm text-slate-400">
              <ChartNoAxesCombined size={28} className="mb-2" />
              No product data available
            </div>
          )}
        </div>

        {/* Compact legend: top five plus Other */}
        <div className="mt-3 space-y-3">
          {loading ? (
            <p className="py-2 text-center text-sm text-slate-400">
              Loading categories...
            </p>
          ) : error ? (
            <p className="py-2 text-center text-sm text-rose-500">
              Distribution data is unavailable.
            </p>
          ) : chartData.length > 0 ? (
            chartData.map((category) => {
              const percentage =
                totalProducts > 0
                  ? ((category.value / totalProducts) * 100).toFixed(1)
                  : "0.0";

              return (
                <div
                  key={category.id ?? category.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />

                    <span className="truncate text-sm text-slate-600">
                      {category.name}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-medium text-slate-800">
                      {category.value}
                    </span>

                    <span className="w-12 text-right text-xs text-slate-400">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="py-2 text-center text-sm text-slate-400">
              No categories with products yet
            </p>
          )}
        </div>

        {/* View all categories */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={openModal}
            disabled={loading || Boolean(error)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Layers3 size={16} />
            View all categories

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {safeCategories.length}
            </span>
          </button>
        </div>
      </section>

      {/* All categories modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-distribution-title"
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
              <div>
                <h2
                  id="category-distribution-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  All Categories
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search categories and review their product counts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close categories modal"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="border-b border-slate-100 p-5">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search categories..."
                  disabled={loading || Boolean(error)}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {loading
                  ? "Loading categories..."
                  : error
                    ? "Category data is unavailable"
                    : `${filteredCategories.length} categories found`}
              </p>
            </div>

            {/* Scrollable category list */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12">
                  <LoaderCircle
                    size={28}
                    className="animate-spin text-blue-500"
                  />
                  <p className="text-sm text-slate-500">
                    Loading categories...
                  </p>
                </div>
              ) : error ? (
                <div
                  role="alert"
                  className="flex flex-col items-center justify-center gap-3 py-12 text-center"
                >
                  <p className="text-sm text-rose-600">
                    Unable to load category distribution.
                  </p>

                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                    >
                      <RefreshCw size={15} />
                      Retry
                    </button>
                  )}
                </div>
              ) : paginatedCategories.length > 0 ? (
                <div className="space-y-1">
                  {paginatedCategories.map((category) => {
                    const percentage =
                      totalProducts > 0
                        ? (
                            (category.value / totalProducts) *
                            100
                          ).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={category.id ?? category.name}
                        className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Layers3 size={17} />
                          </div>

                          <span className="truncate text-sm font-medium text-slate-700">
                            {category.name}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-4">
                          <span className="text-sm font-semibold text-slate-800">
                            {category.value}{" "}
                            <span className="font-normal text-slate-400">
                              products
                            </span>
                          </span>

                          <span className="w-12 text-right text-xs text-slate-400">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Search
                    size={28}
                    className="mx-auto mb-3 text-slate-300"
                  />

                  <p className="text-sm font-medium text-slate-700">
                    No categories found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search term.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 p-4">
              <span className="text-xs text-slate-500">
                Page {safePage} of {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={
                    loading ||
                    Boolean(error) ||
                    safePage <= 1
                  }
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    loading ||
                    Boolean(error) ||
                    safePage >= totalPages
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryDistribution;

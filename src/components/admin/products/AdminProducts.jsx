
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import Loader from "../../shared/Loader";
import toast from "react-hot-toast";

import ProductsStatCards from "./ProductsStatCards";
import ProductsTable from "./ProductsTable";
import ProductPromoBanner from "./ProductPromoBanner";
import RecentProductsWidget from "./RecentProductsWidget";
import AddProductModal from "./AddProductModel";
import EditProduct from "./EditProduct";

import { useAdminProductFilter } from "../../../hooks/useProductFilter";
import {
  deleteProduct,
  fetchCategoryOptions,
  fetchProductStats,
  fetchRecentProducts,
} from "../../../store/action";

function AdminProducts() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    adminProducts = [],
    adminPagination = {},
    adminProductsLoading,
    adminProductsError,

    productStats = {},
    productStatsLoading,
    productStatsError,

    recentProducts = [],
    recentProductsLoading,
    recentProductsError,

    categoryOptions = [],
    categoryOptionsLoading,
    categoryOptionsError,
  } = useSelector((state) => state.products);

  const { refresh } = useAdminProductFilter();

  // Load statistics, recent products, and category options.
  useEffect(() => {
    dispatch(fetchProductStats());
    dispatch(fetchRecentProducts());
    dispatch(fetchCategoryOptions());
  }, [dispatch]);

  // Full-page loading on the initial load only.
  const initialLoading =
    (adminProductsLoading && adminProducts.length === 0) ||
    (productStatsLoading &&
      Object.keys(productStats).length === 0) ||
    (recentProductsLoading && recentProducts.length === 0) ||
    (categoryOptionsLoading && categoryOptions.length === 0);

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  // Build category filter options from the category API and loaded products.
  const tableCategoryOptions = useMemo(() => {
    const names = new Set([
      ...categoryOptions.map((category) => category.categoryName),
      ...adminProducts.map((product) => product.categoryName),
    ]);

    return [...names]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        value: name,
        label: name,
      }));
  }, [categoryOptions, adminProducts]);

  // Read existing filters from the URL.
  const [initialFilters] = useState(() => ({
    search: searchParams.get("keyword") ?? "",
    category: searchParams.get("category") ?? "",
    status: searchParams.get("status") ?? "",
  }));

  const handleFilterChange = useCallback(
    ({ search, category, status }) => {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);

        const setOrRemove = (key, value) => {
          if (value) {
            next.set(key, value);
          } else {
            next.delete(key);
          }
        };

        setOrRemove("keyword", search);
        setOrRemove("category", category);
        setOrRemove("status", status);

        // Reset pagination when filters change.
        next.set("page", "0");

        return next;
      });
    },
    [setSearchParams]
  );

  // Refresh dependent data after product mutations.
  const refreshProductData = () => {
    refresh();
    dispatch(fetchProductStats());
    dispatch(fetchRecentProducts());
  };

  const handleProductAdded = () => {
    refreshProductData();
  };

  const handleEdit = (product) => {
    setEditing(product);
    setEditOpen(true);
  };

  const handleProductUpdated = () => {
    refreshProductData();
  };

  const handleDelete = async (product) => {
    const name =
      product.productName ?? product.name ?? "this product";

    if (
      !window.confirm(
        `Delete "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    const ok = await dispatch(deleteProduct(product, toast));

    if (!ok) return;

    const page = Number(searchParams.get("page") ?? 0);

    // Return to the previous page if the last row was deleted.
    if (adminProducts.length === 1 && page > 0) {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);
        next.set("page", String(page - 1));
        return next;
      });
    } else {
      refresh();
    }

    dispatch(fetchProductStats());
    dispatch(fetchRecentProducts());
  };

  if (initialLoading) {
    return <Loader text="Loading products..." fullScreen />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Products
          </h1>

          <p className="mt-0.5 text-sm text-slate-500">
            Manage your store products, add new ones or update existing items.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Product statistics */}
      {productStatsLoading ? (
        <Loader text="Loading product statistics..." />
      ) : productStatsError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          Failed to load product statistics: {productStatsError}
        </div>
      ) : (
        <ProductsStatCards productStats={productStats} />
      )}

      {/* Category options error */}
      {categoryOptionsLoading && (
        <p className="text-sm text-slate-500">
          Loading category options...
        </p>
      )}

      {categoryOptionsError && (
        <div
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
        >
          Category filter options could not be loaded:{" "}
          {categoryOptionsError}
        </div>
      )}

      {/* Products table and sidebar */}
      <div
        className={`grid gap-4 ${
          showAllProducts
            ? "grid-cols-1"
            : "xl:h-[calc(100vh-14rem)] xl:min-h-[40rem] xl:grid-cols-[minmax(0,1fr)_20rem] xl:grid-rows-1"
        }`}
      >
        <div className="flex min-h-0 min-w-0 flex-col">
          {showAllProducts && (
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowAllProducts(false)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Back to overview
              </button>
            </div>
          )}

          <ProductsTable
            products={adminProducts}
            loading={adminProductsLoading}
            error={adminProductsError}
            pagination={adminPagination}
            categoryOptions={tableCategoryOptions}
            initialFilters={initialFilters}
            onFilterChange={handleFilterChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Dashboard widgets */}
        {!showAllProducts && (
          <div className="grid content-start gap-4 sm:grid-cols-2 xl:min-h-0 xl:grid-cols-1 xl:overflow-y-auto">
            <ProductPromoBanner />

            {/* Recent products */}
            {recentProductsLoading ? (
              <Loader text="Loading recent products..." />
            ) : recentProductsError ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                Failed to load recent products:{" "}
                {recentProductsError}
              </div>
            ) : (
              <RecentProductsWidget
                products={recentProducts}
                onViewAll={() => setShowAllProducts(true)}
              />
            )}
          </div>
        )}
      </div>

      {/* Edit product modal */}
      <EditProduct
        open={editOpen}
        product={editing}
        onClose={() => setEditOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      {/* Add product modal */}
      <AddProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}

export default AdminProducts;

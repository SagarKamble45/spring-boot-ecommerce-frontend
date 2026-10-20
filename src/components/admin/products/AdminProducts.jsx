import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import ProductsStatCards from "./ProductsStatCards";
import ProductsTable from "./ProductsTable";
import ProductPromoBanner from "./ProductPromoBanner";
import RecentProductsWidget from "./RecentProductsWidget";
import AddProductModal from "./AddProductModel";
import EditProduct from "./EditProduct";

import { useAdminProductFilter } from "../../../hooks/useProductFilter";
import {
  fetchCategoryOptions,
  fetchProductStats,
  fetchRecentProducts,
} from "../../../store/action";

/*
 * DATA FLOW (no mock data anywhere)
 *
 *   URL (?page, ?keyword, ?category, ?status)
 *     -> useAdminProductFilter()  builds the query and dispatches the fetch
 *     -> Redux (state.products)   adminProducts, adminPagination, ...
 *     -> this component           passes them to the table / widgets
 *
 *   Filter dropdown / search box
 *     -> ProductsTable calls onFilterChange(filters)
 *     -> handleFilterChange writes them to the URL (and resets page to 0)
 *     -> the URL changed, so the hook above fetches again.
 */
function AdminProducts() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    adminProducts,
    adminPagination,
    adminProductsLoading,
    adminProductsError,
    productStats,
    recentProducts,
    categoryOptions,
  } = useSelector((state) => state.products);

  // Fetches the product list whenever the URL changes.
  const { refresh } = useAdminProductFilter();

  // One-time loads for the stat cards, recent widget and category dropdown.
  useEffect(() => {
    dispatch(fetchProductStats());
    dispatch(fetchRecentProducts());
    dispatch(fetchCategoryOptions());
  }, [dispatch]);

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  // Keep the product while the modal closes, so its content does not flash empty.
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  /* ---------- category dropdown options (from Redux, no mock data) ---------- */
  // The product response only carries `categoryName` (no id), so the filter
  // works on names. Options = every category from the categories API
  // (complete list) + any name present in the loaded products (safety net).
  const tableCategoryOptions = useMemo(() => {
    const names = new Set([
      ...(categoryOptions ?? []).map((category) => category.categoryName),
      ...(adminProducts ?? []).map((product) => product.categoryName),
    ]);

    return [...names]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ value: name, label: name }));
  }, [categoryOptions, adminProducts]);

  /* ---------- filters <-> URL ---------- */
  // Read once so the toolbar starts with what's already in the URL.
  const [initialFilters] = useState(() => ({
    search: searchParams.get("keyword") ?? "",
    category: searchParams.get("category") ?? "",
    status: searchParams.get("status") ?? "",
  }));

  const handleFilterChange = useCallback(
    ({ search, category, status }) => {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);

        const setOrRemove = (key, value) =>
          value ? next.set(key, value) : next.delete(key);

        setOrRemove("keyword", search);
        setOrRemove("category", category);
        setOrRemove("status", status);
        next.set("page", "0"); // new filters => back to the first page

        return next;
      });
    },
    [setSearchParams],
  );

  /* ---------- actions ---------- */
  // The success toast is shown by the addNewProduct action itself.
  const handleProductAdded = () => {
    refresh(); // reload the table with the current filters
    dispatch(fetchProductStats());
    dispatch(fetchRecentProducts());
  };

  const handleEdit = (product) => {
    setEditing(product);
    setEditOpen(true);
  };

  // Same refresh as after adding; the success toast comes from the action.
  const handleProductUpdated = () => {
    refresh();
    dispatch(fetchProductStats());
    dispatch(fetchRecentProducts());
  };

  /* TODO: wire this to the real delete API */
  const handleDelete = (product) =>
    toast(`Delete "${product.name}": connect the delete API here`);

  return (
    /*
     * AdminLayout already provides the page background and padding, so no
     * min-h-screen / p-6 / max-w here (same as Orders).
     */
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
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

      {/* Stat cards */}
      <ProductsStatCards productStats={productStats} />

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

        {/* Hide dashboard widgets when viewing all products */}
        {!showAllProducts && (
          <div className="grid content-start gap-4 sm:grid-cols-2 xl:min-h-0 xl:grid-cols-1 xl:overflow-y-auto">
            <ProductPromoBanner />

            <RecentProductsWidget
              products={recentProducts}
              onViewAll={() => setShowAllProducts(true)}
            />
          </div>
        )}
      </div>

      <EditProduct
        open={editOpen}
        product={editing}
        onClose={() => setEditOpen(false)}
        onProductUpdated={handleProductUpdated}
      />

      <AddProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}

export default AdminProducts;
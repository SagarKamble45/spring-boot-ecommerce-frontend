import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pencil } from "lucide-react";

import DetailsDrawer from "../../shared/Detailsdrawer";

import ProductDrawer from "./ProductDrawer";
import ProductSkeletonRows from "./ProductSkeletonRows";
import ProductsBulkActionBar from "./ProductsBulkActionBar";
import ProductsPagination from "./ProductsPagination";
import ProductsTableRow from "./ProductsTableRow";
import ProductsToolbar from "./ProductsToolbar";

import useProductFilters from "./hooks/useProductFilters";
import useProductSelection from "./hooks/useProductSelection";

import { KNOWN_STOCK_STATUSES } from "./ProductConstatnts";
import { ExportProductsCsv } from "./ExportProductCsv";
import { getCategoryName, getStockStatus } from "./ProductFormat";

export default function ProductsTable({
  products = [],
  loading = false,
  error = "",
  onFilterChange,
  categoryOptions: categoryOptionsProp, // [{ value, label }] from Redux
  initialFilters,
  onEdit = () => {},
  onDelete = () => {},
  pagination,
}) {
  // Passing onFilterChange means filtering is handled outside this table.
  const serverSide = typeof onFilterChange === "function";

  // Keep the active product while the drawer closes.
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [, setSearchParams] = useSearchParams();

  /* ---------- backend records -> table records ---------- */
  const tableRecords = useMemo(
    () =>
      (products ?? []).map((item) => {
        const quantity = Number(item.quantity ?? 0);

        return {
          id: item.productId,
          name: item.productName,
          image: item.image,
          description: item.description,
          category: getCategoryName(item),
          price: item.price,
          specialPrice: item.specialPrice,
          discount: item.discount,
          quantity,
          status: getStockStatus(quantity),
          raw: item,
        };
      }),
    [products],
  );

  /* ---------- filters ---------- */
  const {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    filtered,
    hasFilters,
    clearFilters,
  } = useProductFilters({
    records: tableRecords,
    serverSide,
    onFilterChange,
    initialFilters,
  });

  // Dropdown entries are { value, label }.
  //  - server mode: options come from Redux (value = category name)
  //  - client mode: built from the rows we have (value = category name)
  const categoryOptions = useMemo(() => {
    const base =
      categoryOptionsProp ??
      [...new Set(tableRecords.map((p) => p.category).filter(Boolean))].map(
        (name) => ({ value: name, label: name }),
      );

    const selectedMissing =
      categoryFilter !== "All" &&
      !base.some((option) => option.value === categoryFilter);

    return [
      { value: "All", label: "All categories" },
      ...base,
      ...(selectedMissing
        ? [{ value: categoryFilter, label: categoryFilter }]
        : []),
    ];
  }, [tableRecords, categoryOptionsProp, categoryFilter]);

  const statusOptions = useMemo(
    () => ["All", ...KNOWN_STOCK_STATUSES],
    [],
  );

  /* ---------- backend pagination ---------- */
  // Assumes Redux stores a one-based pageNumber.
  const page = (pagination?.pageNumber ?? 0)+1;
  const pageSize = pagination?.pageSize ?? 6;
  const totalCount = pagination?.totalElements ?? filtered.length;

  // Keep one UI page for an empty result.
  const totalPages = Math.max(
    1,
    pagination?.totalPages ?? Math.ceil(totalCount / pageSize),
  );

  const rangeStart =
    totalCount === 0 ? 0 : (page - 1) * pageSize + 1;

  const rangeEnd = Math.min(page * pageSize, totalCount);

  const goToPage = (displayPage) => {
    if (
      loading ||
      displayPage === page ||
      displayPage < 1 ||
      displayPage > totalPages
    ) {
      return;
    }

    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);
      nextParams.set("page", String(displayPage - 1));
      return nextParams;
    });
  };

  const onPageChange = pagination?.onPageChange ?? goToPage;

  // Up to five page buttons, keeping the current page visible.
  const windowSize = Math.min(totalPages, 5);

  const windowStart = Math.min(
    Math.max(1, page - Math.floor(windowSize / 2)),
    totalPages - windowSize + 1,
  );

  const pageNumbers = Array.from(
    { length: windowSize },
    (_, index) => windowStart + index,
  );

  /* ---------- selection ---------- */
  const {
    selected,
    selectedRows,
    allFilteredSelected,
    toggleRow,
    toggleAll,
    clearSelection,
  } = useProductSelection({
    visibleRows: filtered,
    allRows: tableRecords,
    page,
  });

  /* ---------- drawer ---------- */
  const openProduct = (product) => {
    setActive(product);
    setDrawerOpen(true);
  };

  const showSkeleton = loading && tableRecords.length === 0;
  const dimmed = loading && tableRecords.length > 0;

  return (
    <div className="flex max-h-[75vh] min-h-0 flex-1 flex-col rounded-2xl border border-slate-100 bg-white shadow-sm xl:max-h-none">
      {/* Title */}
      <div className="px-4 pt-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Products List
        </h2>
      </div>

      {/* Toolbar / bulk actions */}
      {selected.length > 0 ? (
        <ProductsBulkActionBar
          selectedCount={selected.length}
          onExport={() => ExportProductsCsv(selectedRows)}
          onClear={clearSelection}
        />
      ) : (
        <ProductsToolbar
          search={search}
          onSearchChange={setSearch}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categoryOptions={categoryOptions}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statusOptions={statusOptions}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
        />
      )}

      {/* Scrollable table */}
      <div
        aria-busy={loading}
        className={`min-h-0 flex-1 overflow-auto transition-opacity ${
          dimmed ? "opacity-60" : ""
        }`}
      >
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-400">
            <tr>
              <th className="w-10 py-2.5 pl-4">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleAll}
                  aria-label="Select all products on this page"
                  className="rounded border-slate-300"
                />
              </th>

              <th className="py-2.5 pr-4">Product</th>
              <th className="py-2.5 pr-4">Category</th>
              <th className="py-2.5 pr-4">Price</th>
              <th className="py-2.5 pr-4">Stock</th>
              <th className="py-2.5 pr-4">Status</th>
              <th className="py-2.5 pr-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {showSkeleton && <ProductSkeletonRows />}

            {!showSkeleton &&
              filtered.map((product) => (
                <ProductsTableRow
                  key={product.id}
                  product={product}
                  isSelected={selected.includes(product.id)}
                  onToggleSelect={toggleRow}
                  onOpen={openProduct}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}

            {!showSkeleton && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center">
                  {error && tableRecords.length === 0 ? (
                    <p className="text-sm text-rose-600">
                      {String(error)}
                    </p>
                  ) : hasFilters ? (
                    <>
                      <p className="text-sm text-slate-500">
                        No products match these filters.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Clear filters
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-slate-400">
                      No products yet.
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ProductsPagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        pageNumbers={pageNumbers}
        onPageChange={onPageChange}
      />

      {/* Product details */}
      <DetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={active ? active.name : ""}
        subtitle={active ? `Product #${active.id}` : ""}
        footer={
          active && (
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                onEdit(active);
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Pencil className="h-4 w-4" />
              Edit product
            </button>
          )
        }
      >
        {active && <ProductDrawer product={active} />}
      </DetailsDrawer>
    </div>
  );
}

import { X } from "lucide-react";

import useCategoryTable from "../hooks/useCategoryTable";
import CategoryTableToolbar from "./CategoryTableToolbar";
import CategoryTableRow from "./CategoryTableRow";
import CategoryTablePagination from "./CategoryTablePagination";
import CategoryTableEmptyState from "./CategoryTableEmptyState";

function CategoryTable({
  categories = [],
  pagination = {},
  currentPage,
  pageNumber = 0,
  pageSize = 10,
  loading = false,

  // URL-driven search and status filters
  searchTerm = "",
  statusFilter = "All",
  onSearchChange,
  onStatusChange,

  onPageChange,
  onViewCategory,
  onEditCategory,
  onDeleteCategory,
}) {
  const {
    selectedIds,
    allCurrentPageSelected,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
  } = useCategoryTable(categories, pagination, onPageChange);

  // The URL is 1-based; Spring Boot pagination is 0-based.
  const displayedPage = currentPage ?? pageNumber + 1;

  // Search, status filtering, and pagination are handled by the backend.
  const paginatedCategories = Array.isArray(categories) ? categories : [];

  const totalItems = pagination.totalElements ?? categories.length;
  const totalPages = Math.max(1, pagination.totalPages ?? 1);

  const firstItem =
    totalItems === 0 ? 0 : pageNumber * pageSize + 1;

  const lastItem = Math.min(
    (pageNumber + 1) * pageSize,
    totalItems,
  );

  const hasFilters = Boolean(
    searchTerm.trim() || statusFilter !== "All",
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <CategoryTableToolbar
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
      />

      {selectedIds.length > 0 && (
        <div className="flex flex-col gap-3 border-b border-blue-100 bg-blue-50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-blue-700">
            {selectedIds.length}{" "}
            {selectedIds.length === 1 ? "category" : "categories"} selected
          </p>

          <button
            type="button"
            onClick={clearSelection}
            className="inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <X size={15} />
            Clear selection
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="w-12 px-5 py-4">
                <input
                  type="checkbox"
                  checked={allCurrentPageSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all categories on this page"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                />
              </th>

              <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </th>

              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Products
              </th>

              <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  Loading categories...
                </td>
              </tr>
            ) : paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => {
                const categoryId = category.categoryId ?? category.id;

                return (
                  <CategoryTableRow
                    key={categoryId}
                    category={category}
                    isSelected={selectedIds.includes(categoryId)}
                    onToggleSelect={toggleSelect}
                    onView={onViewCategory}
                    onEdit={onEditCategory}
                    onDelete={onDeleteCategory}
                  />
                );
              })
            ) : (
              <CategoryTableEmptyState hasFilters={hasFilters} />
            )}
          </tbody>
        </table>
      </div>

      <CategoryTablePagination
        currentPage={displayedPage}
        totalPages={totalPages}
        totalItems={totalItems}
        firstItem={firstItem}
        lastItem={lastItem}
        onPageChange={onPageChange}
      />
    </section>
  );
}

export default CategoryTable;

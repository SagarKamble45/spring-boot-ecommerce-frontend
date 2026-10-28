
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryHeader from "./components/CategoryHeader";
import CategoryStats from "./components/CategoryStats";
import CategoryTable from "./components/CategoryTable";
import CategoryDistribution from "./components/CategoryDistribution";
import CategoryPromoCard from "./components/CategoryPromoCard";
import CategoryFormModal from "./components/CategoryFormModal";
import CategoryDeleteModal from "./components/CategoryDeleteModal";
import CategoryViewModal from "./components/CategoryViewModal";

import useCategories from "./hooks/useCategories";
import {
  fetchCategoryStats,
  fetchCategoryDistribution,
} from "../../../store/action";

const Categories = () => {
  const dispatch = useDispatch();

  // Category data and API states from Redux.
  const {
    adminCategories = [],
    categoryPagination = {},
    categoryLoading = false,
    categoryError = null,

    categoryStats = {},
    categoryStatsLoading = false,
    categoryStatsError = null,

    categoryDistribution = [],
    categoryDistributionLoading = false,
    categoryDistributionError = null,
  } = useSelector((state) => state.category);

  // Fetch category statistics.
  useEffect(() => {
    dispatch(fetchCategoryStats());
  }, [dispatch]);

  // Fetch category distribution independently of table pagination.
  useEffect(() => {
    dispatch(fetchCategoryDistribution());
  }, [dispatch]);

  // Category page actions and modal state.
  const {
    currentPage,
    pageNumber,
    pageSize,
    handlePageChange,
    searchInput,
    status,
    handleSearchChange,
    handleStatusChange,
    selectedCategory,
    isFormOpen,
    isDeleteOpen,
    isViewOpen,
    handleRetry,
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory,
    handleDeleteCategory,
    handleConfirmDelete,
    handleViewCategory,
    closeForm,
    closeDeleteModal,
    closeViewModal,
  } = useCategories();

  // Normalize the paginated category response for the table.
  const categories = Array.isArray(adminCategories)
    ? adminCategories
    : Array.isArray(adminCategories?.content)
      ? adminCategories.content
      : [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <CategoryHeader onAddCategory={handleAddCategory} />

      {/* Categories Loading State */}
      {categoryLoading && (
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <LoaderCircle
            className="animate-spin"
            size={20}
            aria-hidden="true"
          />
          <span>Loading categories...</span>
        </div>
      )}

      {/* Categories Error State */}
      {categoryError && !categoryLoading && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-start gap-3">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-rose-600"
              aria-hidden="true"
            />

            <div className="min-w-0">
              <p className="font-semibold text-rose-800">
                Unable to load categories
              </p>
              <p className="mt-1 break-words text-sm text-rose-700">
                {categoryError}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* Category Statistics */}
      {categoryStatsLoading ? (
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <LoaderCircle
            className="animate-spin"
            size={20}
            aria-hidden="true"
          />
          <span>Loading category statistics...</span>
        </div>
      ) : categoryStatsError ? (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-start gap-3">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-rose-600"
              aria-hidden="true"
            />

            <div className="min-w-0">
              <p className="font-semibold text-rose-800">
                Unable to load category statistics
              </p>
              <p className="mt-1 break-words text-sm text-rose-700">
                {categoryStatsError}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dispatch(fetchCategoryStats())}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Retry
          </button>
        </div>
      ) : (
        <CategoryStats
          totalCategories={categoryStats?.totalCategories ?? 0}
          activeCategories={categoryStats?.activeCategories ?? 0}
          inactiveCategories={categoryStats?.inActiveCategories ?? 0}
          topCategory={categoryStats?.topCategoryDTO ?? null}
        />
      )}

      {/* Main Content */}
      <div className="space-y-5">
        {/* Full-Width Category Table */}
        <div className="w-full min-w-0">
          <CategoryTable
            categories={categories}
            pagination={categoryPagination}
            currentPage={currentPage}
            pageNumber={pageNumber}
            pageSize={pageSize}
            loading={categoryLoading}
            onPageChange={handlePageChange}
            searchTerm={searchInput}
            statusFilter={status}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onViewCategory={handleViewCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </div>

        {/* Category Distribution and Promo Card */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          {/* Category Distribution */}
          <div className="min-w-0">
            <CategoryDistribution
              categories={categoryDistribution}
              loading={categoryDistributionLoading}
              error={categoryDistributionError}
              onRetry={() => dispatch(fetchCategoryDistribution())}
            />
          </div>

          {/* Category Promo Card */}
          <div className="min-w-0">
            <CategoryPromoCard onAddCategory={handleAddCategory} />
          </div>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      <CategoryFormModal
        isOpen={isFormOpen}
        category={selectedCategory}
        onClose={closeForm}
        onSubmit={handleSaveCategory}
      />

      {/* Delete Confirmation Modal */}
      <CategoryDeleteModal
        isOpen={isDeleteOpen}
        category={selectedCategory}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* View Category Modal */}
      <CategoryViewModal
        isOpen={isViewOpen}
        category={selectedCategory}
        onClose={closeViewModal}
      />
    </div>
  );
};

export default Categories;

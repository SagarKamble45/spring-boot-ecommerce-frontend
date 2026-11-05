
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

import FeatureError from "../shared/FeatureError";

import useCategories from "./hooks/useCategories";

import {
  fetchCategoryStats,
  fetchCategoryDistribution,
} from "../../../store/action";

const Categories = () => {
  const dispatch = useDispatch();

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

  // Fetch statistics independently.
  useEffect(() => {
    dispatch(fetchCategoryStats());
  }, [dispatch]);

  // Fetch distribution independently.
  useEffect(() => {
    dispatch(fetchCategoryDistribution());
  }, [dispatch]);

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
    handleSaveCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleConfirmDelete,
    handleViewCategory,

    closeForm,
    closeDeleteModal,
    closeViewModal,
  } = useCategories();

  // Normalize category response.
  const categories = Array.isArray(adminCategories)
    ? adminCategories
    : Array.isArray(adminCategories?.content)
      ? adminCategories.content
      : [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <CategoryHeader onAddCategory={handleAddCategory} />

      {/* Category Statistics */}
      {categoryStatsError && !categoryStatsLoading ? (
        <FeatureError
          title="Unable to load category statistics"
          message={categoryStatsError}
          onRetry={() => dispatch(fetchCategoryStats())}
        />
      ) : (
        <CategoryStats
          totalCategories={categoryStats?.totalCategories ?? 0}
          activeCategories={categoryStats?.activeCategories ?? 0}
          inactiveCategories={categoryStats?.inActiveCategories ?? 0}
          topCategory={categoryStats?.topCategoryDTO ?? null}
          loading={categoryStatsLoading}
        />
      )}

      {/* Main Content */}
      <div className="space-y-5">
        {/* Category Table */}
        <div className="w-full min-w-0">
          <CategoryTable
            categories={categories}
            pagination={categoryPagination}
            currentPage={currentPage}
            pageNumber={pageNumber}
            pageSize={pageSize}
            loading={categoryLoading}
            error={categoryError}
            onRetry={handleRetry}
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

        {/* Distribution and Promo Card */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          <div className="min-w-0">
            <CategoryDistribution
              categories={categoryDistribution}
              loading={categoryDistributionLoading}
              error={categoryDistributionError}
              onRetry={() => dispatch(fetchCategoryDistribution())}
            />
          </div>

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

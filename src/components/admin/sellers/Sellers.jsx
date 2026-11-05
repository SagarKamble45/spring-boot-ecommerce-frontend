
import SellerHeader from "./components/SellerHeader";
import SellerStats from "./components/SellerStats";
import SellerTable from "./components/SellerTable";
import SellerPromoCard from "./components/SellerPromoCard";

import SellerFormModal from "./components/SellerFormModal";
import SellerViewModal from "./components/SellerViewModal";
import SellerDeleteModal from "./components/SellerDeleteModal";

import FeatureError from "../shared/FeatureError";

import useSellers from "./hooks/useSeller";

function Sellers() {
  const {
    sellers,
    pagination,

    sellerLoading: loading,
    sellerMutationLoading: mutationLoading,
    sellerError: error,

    sellerStats,
    sellerStatsLoading,
    sellerStatsError,

    searchInput,
    status,
    sortBy,
    sortOrder,

    handleSearchChange,
    handleStatusChange,
    handleSortByChange,
    handleSortOrderChange,
    handlePageChange,

    refresh,
    refreshSellerStats,

    isSellerModalOpen,
    isViewModalOpen,
    isDeleteModalOpen,

    selectedSeller,
    sellerToDelete,

    handleAddSeller,
    handleEditSeller,
    handleViewSeller,
    handleDeleteSeller,

    handleCloseSellerModal,
    handleCloseViewModal,
    handleCloseDeleteModal,

    handleSaveSeller,
    handleConfirmDelete,
  } = useSellers();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SellerHeader onAddSeller={handleAddSeller} />

      {/* Seller Statistics */}
      <SellerStats
        totalSellers={sellerStats.totalSellers}
        activeSellers={sellerStats.activeSellers}
        inactiveSellers={sellerStats.inactiveSellers}
        totalProducts={sellerStats.totalProducts}
        loading={sellerStatsLoading}
      />

      {/* Statistics Error */}
      {sellerStatsError && (
        <FeatureError
          title="Unable to load seller statistics"
          message={sellerStatsError}
          onRetry={refreshSellerStats}
          compact
        />
      )}

      {/* Sellers Table */}
      <SellerTable
        sellers={sellers}
        searchTerm={searchInput}
        statusFilter={status}
        sortBy={sortBy}
        sortOrder={sortOrder}
        loading={loading}
        error={error}
        onRetry={refresh}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
        onViewSeller={handleViewSeller}
        onEditSeller={handleEditSeller}
        onDeleteSeller={handleDeleteSeller}
      />

      {/* Pagination */}
      {!loading && !error && pagination.totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500">
            Page {pagination.pageNumber + 1} of {pagination.totalPages}
            {" · "}
            {pagination.totalElements} sellers
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.pageNumber === 0}
              onClick={() =>
                handlePageChange(pagination.pageNumber)
              }
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={pagination.lastPage}
              onClick={() =>
                handlePageChange(pagination.pageNumber + 2)
              }
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Promotional Card */}
      <SellerPromoCard onInviteSeller={handleAddSeller} />

      {/* Add / Edit Seller */}
      <SellerFormModal
        isOpen={isSellerModalOpen}
        onClose={handleCloseSellerModal}
        onSubmit={handleSaveSeller}
        seller={selectedSeller}
        isSubmitting={mutationLoading}
      />

      {/* View Seller */}
      <SellerViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        seller={selectedSeller}
      />

      {/* Delete Seller */}
      <SellerDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        seller={sellerToDelete}
        isDeleting={mutationLoading}
      />
    </div>
  );
}

export default Sellers;

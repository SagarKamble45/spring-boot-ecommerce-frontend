import { useMemo, useState } from "react";

import SellerHeader from "./components/SellerHeader";
import SellerStats from "./components/SellerStats";
import SellerTable from "./components/SellerTable";
import SellerPerformance from "./components/SellerPerformance";
import SellerPromoCard from "./components/SellerPromoCard";
import SellerFormModal from "./components/SellerFormModal";
import SellerViewModal from "./components/SellerViewModal";
import SellerDeleteModal from "./components/SellerDeleteModal";

import {
  MOCK_SELLERS,
} from "./data/sellerData";

function Sellers() {
  // Local mock data state
  const [sellers, setSellers] = useState(MOCK_SELLERS);

  // Modal states
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected seller states
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerToDelete, setSellerToDelete] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);

  // Table controls
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");

  // Open Add Seller modal
  const handleAddSeller = () => {
    setSelectedSeller(null);
    setIsSellerModalOpen(true);
  };

  // Open Edit Seller modal
  const handleEditSeller = (seller) => {
    setSelectedSeller(seller);
    setIsSellerModalOpen(true);
  };

  // Open View Seller modal
  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
    setIsViewModalOpen(true);
  };

  // Open Delete Seller modal
  const handleDeleteSeller = (seller) => {
    setSellerToDelete(seller);
    setIsDeleteModalOpen(true);
  };

  // Close Add/Edit modal
  const handleCloseSellerModal = () => {
    setIsSellerModalOpen(false);
    setSelectedSeller(null);
  };

  // Add or Update Seller
  const handleSellerSubmit = (formData) => {
    if (selectedSeller) {
      // Update existing seller
      setSellers((previousSellers) =>
        previousSellers.map((seller) =>
          seller.sellerId === selectedSeller.sellerId
            ? {
                ...seller,
                ...formData,
              }
            : seller
        )
      );
    } else {
      // Create new seller
      const newSeller = {
        sellerId:
          Math.max(0, ...sellers.map((seller) => seller.sellerId)) + 1,
        ...formData,
        totalProducts: 0,
        totalSales: 0,
        createdAt: new Date().toISOString(),
        status: formData.status || "ACTIVE",
      };

      setSellers((previousSellers) => [
        newSeller,
        ...previousSellers,
      ]);
    }

    handleCloseSellerModal();
  };

  // Confirm Delete Seller
  const handleConfirmDelete = async () => {
    if (!sellerToDelete) return;

    try {
      setIsDeleting(true);

      setSellers((previousSellers) =>
        previousSellers.filter(
          (seller) => seller.sellerId !== sellerToDelete.sellerId
        )
      );

      setIsDeleteModalOpen(false);
      setSellerToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  // Search, Filter and Sort
  const filteredSellers = useMemo(() => {
    let result = [...sellers];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();

      result = result.filter(
        (seller) =>
          seller.sellerName?.toLowerCase().includes(search) ||
          seller.email?.toLowerCase().includes(search) ||
          seller.storeName?.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter(
        (seller) => seller.status === statusFilter
      );
    }

    // Sorting
    result.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (sortBy === "createdAt") {
        valueA = new Date(valueA || 0).getTime();
        valueB = new Date(valueB || 0).getTime();
      } else if (
        typeof valueA === "string" &&
        typeof valueB === "string"
      ) {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      } else {
        valueA = Number(valueA || 0);
        valueB = Number(valueB || 0);
      }

      if (valueA < valueB) return sortOrder === "ASC" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "ASC" ? 1 : -1;

      return 0;
    });

    return result;
  }, [sellers, searchTerm, statusFilter, sortBy, sortOrder]);

  // Statistics
  const totalSellers = sellers.length;

  const activeSellers = sellers.filter(
    (seller) => seller.status === "ACTIVE"
  ).length;

  const inactiveSellers = sellers.filter(
    (seller) => seller.status === "INACTIVE"
  ).length;

  const topSeller = [...sellers].sort(
    (a, b) => (b.totalSales || 0) - (a.totalSales || 0)
  )[0];

  // Performance chart data
  const performanceData = useMemo(() => {
    const sellersWithSales = sellers
      .filter((seller) => Number(seller.totalSales) > 0)
      .sort((a, b) => b.totalSales - a.totalSales);

    const topFive = sellersWithSales.slice(0, 5);
    const otherSellers = sellersWithSales.slice(5);

    const result = topFive.map((seller) => ({
      sellerName: seller.sellerName,
      totalSales: Number(seller.totalSales),
    }));

    if (otherSellers.length > 0) {
      result.push({
        sellerName: "Other Sellers",
        totalSales: otherSellers.reduce(
          (total, seller) => total + Number(seller.totalSales || 0),
          0
        ),
      });
    }

    return result;
  }, [sellers]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SellerHeader onAddSeller={handleAddSeller} />

      {/* Statistics */}
      <SellerStats
        totalSellers={totalSellers}
        activeSellers={activeSellers}
        inactiveSellers={inactiveSellers}
        topSellerName={topSeller?.sellerName || "No seller yet"}
        topSellerSales={topSeller?.totalSales || 0}
      />

      {/* Seller Table */}
      <SellerTable
        sellers={filteredSellers}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
        onViewSeller={handleViewSeller}
        onEditSeller={handleEditSeller}
        onDeleteSeller={handleDeleteSeller}
      />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SellerPerformance performanceData={performanceData} />

        <SellerPromoCard onInviteSeller={handleAddSeller} />
      </div>

      {/* Add / Edit Modal */}
      <SellerFormModal
        isOpen={isSellerModalOpen}
        onClose={handleCloseSellerModal}
        onSubmit={handleSellerSubmit}
        seller={selectedSeller}
      />

      {/* View Modal */}
      <SellerViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedSeller(null);
        }}
        seller={selectedSeller}
      />

      {/* Delete Modal */}
      <SellerDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSellerToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        seller={sellerToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default Sellers;
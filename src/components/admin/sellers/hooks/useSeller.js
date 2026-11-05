
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchAdminSellers,
  fetchSellerById,
  createSeller,
  updateSeller,
  deleteSeller,
  updateSellerStatus,
  fetchSellerStats,
} from "../../../../store/action";

const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;

// Build the backend query from URL parameters.
// Frontend page is 1-based; Spring Boot pageNumber is 0-based.
export const buildSellerQuery = (
  searchParams,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const requestedPage = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage >= 1
      ? requestedPage
      : 1;

  const params = new URLSearchParams();

  params.set("pageNumber", String(currentPage - 1));
  params.set("pageSize", String(pageSize));

  const keyword = searchParams.get("keyword")?.trim();
  const status = searchParams.get("status");
  const requestedSort = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "DESC";

  // Map frontend field names to supported backend entity fields.
  const sortFieldMap = {
    sellerName: "userName",
    userName: "userName",
    storeName: "storeName",
    email: "email",
    createdAt: "createdAt",
    sellerStatus: "sellerStatus",
    status: "sellerStatus",
    userId: "userId",
  };

  const sortBy = sortFieldMap[requestedSort] || "createdAt";

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (status && status !== "ALL" && status !== "All") {
    params.set("status", status.toUpperCase());
  }

  params.set("sortBy", sortBy);
  params.set("sortOrder", sortOrder.toLowerCase());

  return params.toString();
};

const useSellers = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    adminSellers,
    sellerPagination,
    sellerLoading,
    sellerMutationLoading,
    sellerError,

    // Seller statistics
    sellerStats,
    sellerStatsLoading,
    sellerStatsError,
  } = useSelector((state) => state.seller);

  const pageSize = DEFAULT_PAGE_SIZE;

  const requestedPage = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage >= 1
      ? requestedPage
      : 1;

  const keyword = searchParams.get("keyword") ?? "";
  const status = searchParams.get("status") ?? "ALL";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = (
    searchParams.get("sortOrder") || "DESC"
  ).toUpperCase();

  const [searchInput, setSearchInput] = useState(keyword);

  // Modal state
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerToDelete, setSellerToDelete] = useState(null);

  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Keep search input synchronized with URL changes.
  useEffect(() => {
    setSearchInput(keyword);
  }, [keyword]);

  // Normalize page parameter.
  useEffect(() => {
    if (searchParams.get("page") !== String(currentPage)) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(currentPage));

      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams, currentPage]);

  // Debounced search.
  useEffect(() => {
    const normalizedInput = searchInput.trim();

    if (normalizedInput === keyword.trim()) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);

      if (normalizedInput) {
        nextParams.set("keyword", normalizedInput);
      } else {
        nextParams.delete("keyword");
      }

      nextParams.set("page", "1");
      setSearchParams(nextParams);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchInput, keyword, searchParams, setSearchParams]);

  // Backend query string.
  const queryString = useMemo(
    () => buildSellerQuery(searchParams, pageSize),
    [searchParams, pageSize],
  );

  // Fetch sellers whenever pagination, search, filter, or sorting changes.
  useEffect(() => {
    dispatch(fetchAdminSellers(queryString));
  }, [dispatch, queryString]);

  // Fetch seller statistics when the page loads.
  useEffect(() => {
    dispatch(fetchSellerStats());
  }, [dispatch]);

  // Search input handler.
  const handleSearchChange = useCallback((value) => {
    setSearchInput(value);
  }, []);

  // Status filter.
  const handleStatusChange = useCallback(
    (nextStatus) => {
      const nextParams = new URLSearchParams(searchParams);
      const normalizedStatus = nextStatus?.toUpperCase();

      if (!normalizedStatus || normalizedStatus === "ALL") {
        nextParams.delete("status");
      } else {
        nextParams.set("status", normalizedStatus);
      }

      nextParams.set("page", "1");
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  // Sorting.
  const handleSortByChange = useCallback(
    (nextSortBy) => {
      const nextParams = new URLSearchParams(searchParams);

      nextParams.set("sortBy", nextSortBy);
      nextParams.set("page", "1");

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  const handleSortOrderChange = useCallback(
    (nextSortOrder) => {
      const nextParams = new URLSearchParams(searchParams);

      nextParams.set("sortOrder", nextSortOrder.toUpperCase());
      nextParams.set("page", "1");

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  // Pagination.
  const handlePageChange = useCallback(
    (nextPage) => {
      const page = Number(nextPage);

      if (
        !Number.isSafeInteger(page) ||
        page < 1 ||
        page === currentPage
      ) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(page));

      setSearchParams(nextParams);
    },
    [currentPage, searchParams, setSearchParams],
  );

  // Refresh current seller query.
  const refresh = useCallback(() => {
    return dispatch(fetchAdminSellers(queryString));
  }, [dispatch, queryString]);

  // Refresh seller statistics.
  const refreshSellerStats = useCallback(() => {
    return dispatch(fetchSellerStats());
  }, [dispatch]);

  // Open add seller modal.
  const handleAddSeller = useCallback(() => {
    setSelectedSeller(null);
    setIsSellerModalOpen(true);
  }, []);

  // Open edit seller modal.
  const handleEditSeller = useCallback((seller) => {
    setSelectedSeller(seller);
    setIsSellerModalOpen(true);
  }, []);

  // Create or update seller.
  const handleSaveSeller = useCallback(
    async (formData) => {
      const payload = {
        userName: (
          formData.userName ?? formData.sellerName ?? ""
        ).trim(),
        email: formData.email?.trim() || "",
        storeName: formData.storeName?.trim() || "",
        phone: formData.phone?.trim() || "",
        password: formData.password || "",
      };

      if (!payload.userName || !payload.email || !payload.storeName) {
        return {
          ok: false,
          error: "Please complete all required seller details.",
        };
      }

      let result;

      if (selectedSeller) {
        const nextStatus =
          formData.sellerStatus || selectedSeller.sellerStatus;

        const statusChanged =
          nextStatus !== selectedSeller.sellerStatus;

        // First update seller profile.
        result = await dispatch(
          updateSeller(
            selectedSeller.sellerId,
            payload,
            queryString,
            statusChanged ? undefined : toast,
          ),
        );

        if (!result?.ok) return result;

        // Update status only when it has changed.
        if (statusChanged) {
          result = await dispatch(
            updateSellerStatus(
              selectedSeller.sellerId,
              nextStatus,
              queryString,
              toast,
            ),
          );

          if (!result?.ok) return result;
        }
      } else {
        result = await dispatch(
          createSeller(payload, queryString, toast),
        );

        if (!result?.ok) return result;
      }

      // Refresh statistics after successful create/update.
      dispatch(fetchSellerStats());

      setIsSellerModalOpen(false);
      setSelectedSeller(null);

      return result;
    },
    [dispatch, selectedSeller, queryString],
  );

  // Open seller view modal and fetch latest details.
  const handleViewSeller = useCallback(
    async (seller) => {
      setSelectedSeller(seller);
      setIsViewModalOpen(true);

      const result = await dispatch(
        fetchSellerById(seller.sellerId),
      );

      if (result && !result.error) {
        setSelectedSeller(result);
      }
    },
    [dispatch],
  );

  // Open delete confirmation modal.
  const handleDeleteSeller = useCallback((seller) => {
    setSellerToDelete(seller);
    setIsDeleteModalOpen(true);
  }, []);

  // Confirm delete/deactivation.
  const handleConfirmDelete = useCallback(async () => {
    if (!sellerToDelete?.sellerId) {
      return {
        ok: false,
        error: "Seller ID is missing.",
      };
    }

    const result = await dispatch(
      deleteSeller(sellerToDelete.sellerId, queryString, toast),
    );

    if (result?.ok) {
      setIsDeleteModalOpen(false);
      setSellerToDelete(null);

      // Refresh statistics after successful delete/deactivation.
      dispatch(fetchSellerStats());
    }

    return result;
  }, [dispatch, sellerToDelete, queryString]);

  // Close handlers.
  const handleCloseSellerModal = useCallback(() => {
    setIsSellerModalOpen(false);
    setSelectedSeller(null);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setIsViewModalOpen(false);
    setSelectedSeller(null);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    if (sellerMutationLoading) return;

    setIsDeleteModalOpen(false);
    setSellerToDelete(null);
  }, [sellerMutationLoading]);

  return {
    // Seller list data
    sellers: adminSellers || [],
    pagination: sellerPagination,
    sellerLoading,
    sellerMutationLoading,
    sellerError,

    // Seller statistics
    sellerStats: sellerStats || {
      totalSellers: 0,
      activeSellers: 0,
      inactiveSellers: 0,
      totalProducts: 0,
    },
    sellerStatsLoading,
    sellerStatsError,

    // Pagination
    currentPage,
    pageNumber: currentPage - 1,
    pageSize,
    handlePageChange,

    // Search, filter, and sorting
    keyword,
    status,
    searchInput,
    sortBy,
    sortOrder,
    handleSearchChange,
    handleStatusChange,
    handleSortByChange,
    handleSortOrderChange,

    // Modal state
    selectedSeller,
    sellerToDelete,
    isSellerModalOpen,
    isViewModalOpen,
    isDeleteModalOpen,

    // CRUD handlers
    handleAddSeller,
    handleEditSeller,
    handleSaveSeller,
    handleViewSeller,
    handleDeleteSeller,
    handleConfirmDelete,

    // Close and refresh
    handleCloseSellerModal,
    handleCloseViewModal,
    handleCloseDeleteModal,
    refresh,
    refreshSellerStats,
    handleRetry: refresh,
  };
};

export default useSellers;

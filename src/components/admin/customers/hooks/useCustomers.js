import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchAdminCustomers,
  fetchCustomerDetails,
  fetchCustomerStats,
  updateCustomerStatus,
} from "../../../../store/action";
import toast from "react-hot-toast";




const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;

// build backend qury parameters
// frontend page is 1-based; spirng boot pageNumber is 0-based
export const buildCustomerQuery = (
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
  const sortBy = searchParams.get("sortBy") || "userId";
  const sortOrder = (searchParams.get("sortOrder") || "DESC").toLowerCase();

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (status && status.toUpperCase() !== "ALL") {
    params.set("status", status.toUpperCase());
  }

  params.set("sortBy", sortBy);
  params.set("sortOrder", sortOrder);

  return params.toString();
};

const useCustomers = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // redux state
  const {
    adminCustomers,
    customerPagination,
    customerLoading,
    customerError,

    customerStats,
    customerStatsLoading,
    customerStatsError,

    customerDetails,
    customerDetailsLoading,
    customerDetailsError,

    customerMutationLoading,
    customerMutationError,
  } = useSelector((state) => state.customer);

  const pageSize = DEFAULT_PAGE_SIZE;

  // URL parameter
  const requestedPage = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage >= 1
      ? requestedPage
      : 1;

  const keyword = searchParams.get("keyword") ?? "";
  const statusFilter = searchParams.get("status") ?? "ALL";

  const sortBy = searchParams.get("sortBy") || "userId";
  const sortOrder = (searchParams.get("sortOrder") || "DESC").toUpperCase();

  // Search Input state
  const [searchTerm, setSearchTerm] = useState(keyword);

  // Modal State
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [pendingStatusCustomer, setPendingStatusCustomer] = useState(null);

  // keep search input synchronized with URL changes
  useEffect(() => {
    setSearchTerm(keyword);
  }, [keyword]);

  // Normalise page parameter
  useEffect(() => {
    if (searchParams.get("page") !== String(currentPage)) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(currentPage));

      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams, currentPage]);

  // Debounced server-side search
  useEffect(() => {
    const normalizedInput = searchTerm.trim();

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
  }, [searchTerm, keyword, searchParams, setSearchParams]);

  // Build backend query string.
  const queryString = useMemo(
    () => buildCustomerQuery(searchParams, pageSize),
    [searchParams, pageSize],
  );

  // Fetch customers whenever query parameters change.
  useEffect(() => {
    dispatch(fetchAdminCustomers(queryString));
  }, [dispatch, queryString]);

  // Fetch statistics when the page loads.
  useEffect(() => {
    dispatch(fetchCustomerStats());
  }, [dispatch]);

  // Search handler.
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // Status filter handler.
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

  // Sorting handlers.
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

  // Pagination handler.
  const handlePageChange = useCallback(
    (nextPage) => {
      const page = Number(nextPage);

      if (!Number.isSafeInteger(page) || page < 1 || page === currentPage) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(page));

      setSearchParams(nextParams);
    },
    [currentPage, searchParams, setSearchParams],
  );

  // Refresh customer list.
  const refresh = useCallback(() => {
    return dispatch(fetchAdminCustomers(queryString));
  }, [dispatch, queryString]);

  // Refresh customer statistics.
  const refreshCustomerStats = useCallback(() => {
    return dispatch(fetchCustomerStats());
  }, [dispatch]);

  // Open customer details
  const handleViewCustomer = useCallback(
    async (customer) => {
      setSelectedCustomer(customer);

      // Clear previous customer's details and errors
      dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });

      return dispatch(fetchCustomerDetails(customer.customerId));
    },
    [dispatch],
  );

  // Retry customer details API
  const retryCustomerDetails = useCallback(() => {
    if (!selectedCustomer?.customerId) return;

    return dispatch(fetchCustomerDetails(selectedCustomer.customerId));
  }, [dispatch, selectedCustomer]);

  // Close customer details.
  const handleCloseCustomer = useCallback(() => {
    setSelectedCustomer(null);
    dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
  }, [dispatch]);

  // Open status confirmation modal.
  const handleRequestStatusChange = useCallback((customer) => {
    setPendingStatusCustomer(customer);
  }, []);

  // Cancel status confirmation.
  const handleCancelStatusChange = useCallback(() => {
    if (customerMutationLoading) return;

    setPendingStatusCustomer(null);
  }, [customerMutationLoading]);

  // Confirm customer status update.
  const handleConfirmStatusChange = useCallback(async () => {
    if (!pendingStatusCustomer || customerMutationLoading) {
      return;
    }

    const customerId = pendingStatusCustomer.customerId;

    const updatedStatus =
      pendingStatusCustomer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const result = await dispatch(
      updateCustomerStatus(customerId, updatedStatus, queryString, toast),
    );

    if (result?.ok) {
      setPendingStatusCustomer(null);

      // Refresh statistics because active/inactive counts changed.
      dispatch(fetchCustomerStats());

      // Refresh open customer details if the same profile is selected.
      if (selectedCustomer?.customerId === customerId) {
        dispatch(fetchCustomerDetails(customerId));
      }
    }

    return result;
  }, [
    dispatch,
    pendingStatusCustomer,
    customerMutationLoading,
    queryString,
    selectedCustomer,
  ]);

  return {
    // Customer list
    customers: adminCustomers,
    customerLoading,
    customerError,

    // Search and filters
    searchTerm,
    setSearchTerm: handleSearchChange,
    statusFilter,
    setStatusFilter: handleStatusChange,

    // Sorting
    sortBy,
    sortOrder,
    handleSortByChange,
    handleSortOrderChange,

    // Pagination
    currentPage,
    setCurrentPage: handlePageChange,
    totalPages: customerPagination.totalPages,
    totalElements: customerPagination.totalElements,
    pageSize,

    // Statistics
    stats: customerStats,
    customerStatsLoading,
    customerStatsError,
    refreshCustomerStats,

    // Customer details
    selectedCustomer,
    customerDetails,
    customerDetailsLoading,
    customerDetailsError,
    handleViewCustomer,
    handleCloseCustomer,
    retryCustomerDetails,

    // Customer status
    pendingStatusCustomer,
    isStatusUpdating: customerMutationLoading,
    customerMutationError,
    handleRequestStatusChange,
    handleCancelStatusChange,
    handleConfirmStatusChange,

    // Refresh
    refresh,
  };
};

export default useCustomers;

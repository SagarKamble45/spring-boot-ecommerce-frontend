
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getMyOrders } from "../../../store/action";

import MyOrdersHeader from "./components/MyOrdersHeader";
import MyOrdersFilters from "./components/MyOrdersFilters";
import MyOrdersList from "./components/MyOrdersList";
import MyOrdersPagination from "./components/MyOrdersPagination";

const PAGE_SIZE = 10;

const VALID_STATUSES = [
  "ALL",
  "IN_PROGRESS",
  "DELIVERED",
  "CANCELLED",
];

const VALID_SORTS = [
  "orderDate",
  "totalAmount",
  "orderId",
  "orderStatus",
];

function MyOrders() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    myOrders = [],
    myOrdersPagination = {},
    myOrdersLoading,
    myOrdersError,
  } = useSelector((state) => state.order);

  // Read filters from URL.
  const requestedStatus = (
    searchParams.get("status") || "ALL"
  ).toUpperCase();

  const status = VALID_STATUSES.includes(requestedStatus)
    ? requestedStatus
    : "ALL";

  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  const requestedSortBy = searchParams.get("sortBy") || "orderDate";
  const sortBy = VALID_SORTS.includes(requestedSortBy)
    ? requestedSortBy
    : "orderDate";

  const sortOrder =
    searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const currentPage = Math.max(
    0,
    Number(searchParams.get("pageNumber") || 0)
  );

  // Build backend query.
  const buildQueryString = () => {
    const query = new URLSearchParams({
      status,
      pageNumber: String(currentPage),
      pageSize: String(PAGE_SIZE),
      sortBy,
      sortOrder,
    });

    if (fromDate) query.set("fromDate", fromDate);
    if (toDate) query.set("toDate", toDate);

    return query.toString();
  };

  // Fetch whenever filters or pagination change.
  useEffect(() => {
    dispatch(getMyOrders(buildQueryString()));
  }, [
    dispatch,
    status,
    fromDate,
    toDate,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  // Update status.
  const handleStatusChange = (nextStatus) => {
    const params = new URLSearchParams(searchParams);

    params.set("status", nextStatus);
    params.set("pageNumber", "0");

    setSearchParams(params);
  };

  // Update date range.
  const handleDateApply = (startDate, endDate) => {
    const params = new URLSearchParams(searchParams);

    if (startDate) {
      params.set("fromDate", startDate);
    } else {
      params.delete("fromDate");
    }

    if (endDate) {
      params.set("toDate", endDate);
    } else {
      params.delete("toDate");
    }

    params.set("pageNumber", "0");
    setSearchParams(params);
  };

  // Update sorting.
  const handleSortChange = (nextSortBy, nextSortOrder) => {
    const params = new URLSearchParams(searchParams);

    params.set("sortBy", nextSortBy);
    params.set("sortOrder", nextSortOrder);
    params.set("pageNumber", "0");

    setSearchParams(params);
  };

  // Change page without losing filters.
  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);

    params.set("pageNumber", String(pageNumber));

    setSearchParams(params);
  };

  const handleRetry = () => {
    dispatch(getMyOrders(buildQueryString()));
  };

  const totalPages = myOrdersPagination.totalPages ?? 0;
  const totalOrders = myOrdersPagination.totalElements ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">

        <MyOrdersHeader />

        <MyOrdersFilters
          status={status}
          fromDate={fromDate}
          toDate={toDate}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onStatusChange={handleStatusChange}
          onDateApply={handleDateApply}
          onSortChange={handleSortChange}
        />

        {/* Loading */}
        {myOrdersLoading && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-red-800" />
            <p className="mt-3 text-sm text-slate-500">
              Loading your orders...
            </p>
          </div>
        )}

        {/* Error */}
        {!myOrdersLoading && myOrdersError && (
          <div className="rounded-xl border  border-danger/30 bg-surface p-6">
            <p className="font-semibold">
              Unable to load your orders
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {String(myOrdersError)}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!myOrdersLoading &&
          !myOrdersError &&
          myOrders.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <span className="text-2xl">📦</span>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                No matching orders
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your status or date filters.
              </p>
            </div>
          )}

        {/* Orders */}
        {!myOrdersLoading &&
          !myOrdersError &&
          myOrders.length > 0 && (
            <div className="space-y-5">
              <MyOrdersList
                orders={myOrders}
                totalOrders={totalOrders}
              />

              <MyOrdersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
      </div>
    </main>
  );
}

export default MyOrders;

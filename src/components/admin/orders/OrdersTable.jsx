import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import DetailsDrawer from "../../shared/DetailsDrawer";
import { exportCsv } from "../../../utils/exportCsv";

import OrderDrawer from "./OrderDrawer";
import SkeletonRows from "./SkeletonRows";
import OrdersBulkActionBar from "./OrdersBulkActionBar";
import OrdersPagination from "./OrdersPagination";
import OrdersTableRow from "./OrdersTableRow";
import OrdersToolbar from "./OrdersToolbar";

import useOrderFilters from "./hooks/useOrderFilters";
import useOrderSelection from "./hooks/useOrderSelection";

import { KNOWN_STATUSES } from "./utils/orderConstants";
import { formatDate, normalizeStatus } from "./utils/orderFormat";

/* ------------------------------------------------------------------ */
/*  Orders table                                                       */
/* ------------------------------------------------------------------ */
export default function OrdersTable({
  orders = [],
  loading = false,
  error = "",
  onFilterChange,
  statusOptions: statusOptionsProp,
  paymentOptions: paymentOptionsProp,
  pagination,
}) {
  const serverSide = typeof onFilterChange === "function";

  // Keep the order after closing so drawer content does not disappear mid-slide.
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /*
   * Pagination is driven by the URL (?page=2). The page/filter parent hook
   * can watch URL changes and fetch the correct orders.
   */
  const [, setSearchParams] = useSearchParams();

  const goToPage = (pageNumber) => {
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);
      nextParams.set("page", String(pageNumber));
      return nextParams;
    });
  };

  const tableRecords = useMemo(
    () =>
      (orders ?? []).map((item) => ({
        id: item.orderId,
        email: item.email,
        totalAmount: item.totalAmount,
        status: normalizeStatus(item.orderStatus),
        orderDate: item.orderDate,
        PgName: item.payment?.pgName,
        UserName: item.userName,
        raw: item,
      })),
    [orders],
  );

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    filtered,
    hasFilters,
    clearFilters,
  } = useOrderFilters({
    records: tableRecords,
    serverSide,
    onFilterChange,
  });

  // Dropdown options include the selected value so a <select> never points
  // at a value that does not exist in its available options.
  const statusOptions = useMemo(() => {
    const fromData = tableRecords.map((order) => order.status).filter(Boolean);
    const base = statusOptionsProp ?? [...KNOWN_STATUSES, ...fromData];

    return [
      "All",
      ...new Set(
        [...base, statusFilter].filter((value) => value && value !== "All"),
      ),
    ];
  }, [tableRecords, statusOptionsProp, statusFilter]);

  const paymentOptions = useMemo(() => {
    const fromData = tableRecords.map((order) => order.PgName).filter(Boolean);
    const base = paymentOptionsProp ?? fromData;

    return [
      "All",
      ...new Set(
        [...base, paymentFilter].filter((value) => value && value !== "All"),
      ),
    ];
  }, [tableRecords, paymentOptionsProp, paymentFilter]);

  /* ---------- selection ---------- */
  const page = pagination?.page ?? 1;

  const {
    selected,
    selectedRows,
    allFilteredSelected,
    toggleRow,
    toggleAll,
    clearSelection,
  } = useOrderSelection({
    visibleRows: filtered,
    allRows: tableRecords,
    page,
  });

  const openOrder = (order) => {
    setActive(order);
    setDrawerOpen(true);
  };

  /* ---------- pagination (page is 1-based) ---------- */
  const totalCount = pagination?.totalElements ?? filtered.length;
  const pageSize = pagination?.pageSize ?? 8;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);
  const onPageChange = pagination?.onPageChange ?? goToPage;

  // Show up to five page buttons, keeping the current page visible.
  const windowSize = Math.min(totalPages, 5);

  const windowStart = Math.min(
    Math.max(1, page - Math.floor(windowSize / 2)),
    totalPages - windowSize + 1,
  );

  const pageNumbers = Array.from(
    { length: windowSize },
    (_, index) => windowStart + index,
  );

  const showSkeleton = loading && tableRecords.length === 0;
  const dimmed = loading && tableRecords.length > 0;

  return (
    <div className="flex max-h-[75vh] min-h-0 flex-1 flex-col rounded-2xl border border-slate-100 bg-white shadow-sm xl:max-h-none">
      {/* TITLE */}
      <div className="px-4 pt-4">
        <h2 className="text-lg font-semibold text-slate-900">Orders List</h2>
      </div>

      {/* TOOLBAR ⇄ BULK ACTION BAR */}
      {selected.length > 0 ? (
        <OrdersBulkActionBar
          selectedCount={selected.length}
          onExport={() => exportCsv(selectedRows)}
          onClear={clearSelection}
        />
      ) : (
        <OrdersToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statusOptions={statusOptions}
          paymentFilter={paymentFilter}
          onPaymentChange={setPaymentFilter}
          paymentOptions={paymentOptions}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
        />
      )}

      {/* TABLE: only this part scrolls; header row stays visible */}
      <div
        className={`min-h-0 flex-1 overflow-auto transition-opacity ${
          dimmed ? "opacity-60" : ""
        }`}
      >
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-400">
            <tr>
              <th className="w-10 py-2.5 pl-4">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleAll}
                  aria-label="Select all orders on this page"
                  className="rounded border-slate-300"
                />
              </th>

              <th className="py-2.5 pr-4">Order ID</th>
              <th className="py-2.5 pr-4">Customer</th>
              <th className="py-2.5 pr-4">Date</th>
              <th className="py-2.5 pr-4 text-right">Amount</th>
              <th className="py-2.5 pr-4 pl-6">Payment</th>
              <th className="py-2.5 pr-4">Status</th>

              <th className="w-10 py-2.5 pr-4">
                <span className="sr-only">View details</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {showSkeleton && <SkeletonRows />}

            {!showSkeleton &&
              filtered.map((order) => (
                <OrdersTableRow
                  key={order.id}
                  order={order}
                  isSelected={selected.includes(order.id)}
                  onToggleSelect={toggleRow}
                  onOpen={openOrder}
                />
              ))}

            {!showSkeleton && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  {error && tableRecords.length === 0 ? (
                    <p className="text-sm text-rose-600">{String(error)}</p>
                  ) : hasFilters ? (
                    <>
                      <p className="text-sm text-slate-500">
                        No orders match these filters.
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
                    <p className="text-sm text-slate-400">No orders yet.</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION: pinned to the bottom of the card */}
      <OrdersPagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        pageNumbers={pageNumbers}
        onPageChange={onPageChange}
      />

      <DetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={active ? `Order #${active.id}` : ""}
        subtitle={active ? `Placed on ${formatDate(active.orderDate)}` : ""}
      >
        {active && (
          <OrderDrawer
            order={active}
            onStatusUpdated={({ orderId, status }) => {
              // Keep the active order consistent until the drawer close animation ends.
              setActive((previousOrder) => {
                if (previousOrder?.id !== orderId) {
                  return previousOrder;
                }

                return {
                  ...previousOrder,
                  status,
                  raw: {
                    ...previousOrder.raw,
                    orderStatus: status,
                  },
                };
              });

              // Close only after UpdateOrderStatusForm has awaited successful API work.
              setDrawerOpen(false);
            }}
          />
        )}
      </DetailsDrawer>
    </div>
  );
}

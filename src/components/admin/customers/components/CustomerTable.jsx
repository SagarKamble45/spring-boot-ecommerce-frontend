import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import CustomerTableToolbar from "./CustomerTableToolbar";
import CustomerTableRow from "./CustomerTableRow";

import { RefreshCw } from "lucide-react";
import FeatureError from "../../shared/FeatureError";

const CustomerTableSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="animate-pulse border-b border-slate-100">
        {Array.from({ length: 8 }).map((_, columnIndex) => (
          <td key={columnIndex} className="px-5 py-5">
            <div
              className={`h-4 rounded bg-slate-200 ${
                columnIndex === 0 ? "w-28" : "w-20"
              }`}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const CustomerTable = ({
  customers = [],
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onView,
  onToggleStatus,
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  loading = false,
  error = null,
  onRetry,
}) => {
  const startItem = totalElements === 0 ? 0 : (currentPage - 1) * 10 + 1;

  const endItem = Math.min(currentPage * 10, totalElements);

  const showInitialLoading = loading && customers.length === 0;
  const showError = Boolean(error) && customers.length === 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      
      <CustomerTableToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading && customers.length > 0 && (
  <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600">
    <RefreshCw size={13} className="animate-spin" />
    Updating...
  </span>
)}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Assigned Roles</th>
              <th className="px-5 py-4">Contact Details</th>
              <th className="px-5 py-4 text-center">Orders</th>
              <th className="px-5 py-4">Total Spent</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Joined On</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {showInitialLoading ? (
              <CustomerTableSkeleton />
            ) : customers.length > 0 ? (
              customers.map((customer) => (
                <CustomerTableRow
                  key={customer.customerId}
                  customer={customer}
                  onView={onView}
                  onToggleStatus={onToggleStatus}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-5 py-12">
                  {showError ? (
                    <FeatureError
                      title="Unable to load customers"
                      message={error}
                      onRetry={onRetry}
                    />
                  ) : (
                    <div className="text-center">
                      <Users size={28} className="mx-auto text-slate-400" />
                      <h3 className="mt-3 font-semibold text-slate-800">
                        No customers found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or status filter.
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {startItem}-{endItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{totalElements}</span>{" "}
          customers
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="min-w-24 text-center text-sm font-medium text-slate-700">
            Page {currentPage} of {Math.max(totalPages, 1)}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;

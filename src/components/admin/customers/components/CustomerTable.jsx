
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import CustomerTableToolbar from "./CustomerTableToolbar";
import CustomerTableRow from "./CustomerTableRow";

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
}) => {
  const startItem =
    totalElements === 0 ? 0 : (currentPage - 1) * 10 + 1;

  const endItem = Math.min(currentPage * 10, totalElements);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CustomerTableToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Contact Details</th>
              <th className="px-5 py-4 text-center">Orders</th>
              <th className="px-5 py-4">Total Spent</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Joined On</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
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
                <td colSpan="7" className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Users size={26} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-800">
                      No customers found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or status filter.
                    </p>
                  </div>
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
          <span className="font-semibold text-slate-700">
            {totalElements}
          </span>{" "}
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

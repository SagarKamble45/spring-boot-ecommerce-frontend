
import { Store, RefreshCw } from "lucide-react";

import SellerTableToolbar from "./SellerTableToolbar";
import SellerTableRow from "./SellerTableRow";
import FeatureError from "../../shared/FeatureError";

const TABLE_COLUMNS = [
  "Seller",
  "Store Name",
  "Email",
  "Products",
  "Total Sales",
  "Date Joined",
  "Status",
  "Actions",
];

const SellerTableSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="animate-pulse border-b border-slate-100">
        {TABLE_COLUMNS.map((column, columnIndex) => (
          <td key={columnIndex} className="px-5 py-5">
            <div
              className={`h-4 rounded bg-slate-200 ${
                columnIndex === 0
                  ? "w-28"
                  : columnIndex === 7
                    ? "mx-auto w-16"
                    : "w-24"
              }`}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const SellerTable = ({
  sellers = [],
  searchTerm = "",
  statusFilter = "ALL",
  sortBy = "createdAt",
  sortOrder = "DESC",
  loading = false,
  error = null,
  onRetry,
  onSearchChange,
  onStatusChange,
  onSortByChange,
  onSortOrderChange,
  onViewSeller,
  onEditSeller,
  onDeleteSeller,
}) => {
  const showInitialLoading = loading && sellers.length === 0;
  const showError = Boolean(error) && sellers.length === 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex flex-col gap-1 px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">
            All Sellers
          </h2>

          {loading && sellers.length > 0 && (
            <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600">
              <RefreshCw size={13} className="animate-spin" />
              Updating...
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500">
          Manage and monitor your registered sellers.
        </p>
      </div>

      {/* Toolbar */}
      <SellerTableToolbar
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onSortByChange={onSortByChange}
        onSortOrderChange={onSortOrderChange}
      />

      {/* Error State */}
      {showError ? (
        <div className="p-5">
          <FeatureError
            title="Unable to load sellers"
            message={error}
            onRetry={onRetry}
          />
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {TABLE_COLUMNS.map((column, index) => (
                    <th
                      key={column}
                      className={`px-5 py-4 ${
                        index === 3 || index === 7
                          ? "text-center"
                          : ""
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {showInitialLoading ? (
                  <SellerTableSkeleton />
                ) : sellers.length > 0 ? (
                  sellers.map((seller) => (
                    <SellerTableRow
                      key={seller.sellerId}
                      seller={seller}
                      onView={onViewSeller}
                      onEdit={onEditSeller}
                      onDelete={onDeleteSeller}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Store size={25} />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-slate-800">
                          No sellers found
                        </h3>

                        <p className="mt-1 max-w-sm text-sm text-slate-500">
                          There are no sellers to display. Try changing
                          your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {sellers.length}
              </span>{" "}
              sellers
            </p>

            <p className="text-xs text-slate-400">
              Seller management
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default SellerTable;

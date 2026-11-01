
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const SellerTableToolbar = ({
  searchTerm = "",
  statusFilter = "ALL",
  sortBy = "createdAt",
  sortOrder = "DESC",
  onSearchChange,
  onStatusChange,
  onSortByChange,
  onSortOrderChange,
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search sellers, email or store..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status Filter */}
          <div className="relative min-w-0 sm:min-w-[155px]">
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(event) => onStatusChange?.(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            >
              <option value="ALL">All Sellers</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative min-w-0 sm:min-w-[170px]">
            <ArrowUpDown
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sortBy}
              onChange={(event) => onSortByChange?.(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            >
              <option value="createdAt">Date Joined</option>
              <option value="sellerName">Seller Name</option>
              <option value="storeName">Store Name</option>
              <option value="totalSales">Total Sales</option>
            </select>
          </div>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(event) => onSortOrderChange?.(event.target.value)}
            aria-label="Sort order"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 sm:w-auto"
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SellerTableToolbar;

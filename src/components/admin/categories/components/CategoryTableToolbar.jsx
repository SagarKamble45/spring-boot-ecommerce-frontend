
import { Search } from "lucide-react";

function CategoryTableToolbar({
  searchTerm = "",
  statusFilter = "All",
  onSearchChange,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          All Categories
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage and organize your product categories.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search categories..."
            aria-label="Search categories"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-56"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusChange?.(event.target.value)
          }
          aria-label="Filter by status"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default CategoryTableToolbar;

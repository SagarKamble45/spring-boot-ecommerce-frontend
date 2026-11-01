import { Plus, UsersRound } from "lucide-react";

const SellerHeader = ({ onAddSeller }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Title */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <UsersRound size={24} strokeWidth={2} />
        </div>

        {/* Title and Description */}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sellers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor all registered sellers on your platform.
          </p>
        </div>
      </div>

      {/* Add Seller Button */}
      <button
        type="button"
        onClick={onAddSeller}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        <Plus size={18} strokeWidth={2.5} />
        Add Seller
      </button>
    </div>
  );
};

export default SellerHeader;


import { X, Store, UserRound, Mail, Phone, CalendarDays, Package, IndianRupee } from "lucide-react";
import SellerStatusBadge from "./SellerStatusBadge";

const SellerViewModal = ({ isOpen, onClose, seller }) => {
  if (!isOpen || !seller) return null;

  const {
    sellerId,
    sellerName,
    email,
    storeName,
    phone,
    status,
    totalProducts = 0,
    totalSales = 0,
    createdAt,
  } = seller;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Seller Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View complete seller information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Seller Profile */}
        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Store size={27} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-slate-900">
                  {storeName || "Unnamed Store"}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Seller ID: #{sellerId}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <SellerStatusBadge status={status} />
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <DetailItem
                icon={UserRound}
                label="Seller Name"
                value={sellerName}
              />

              <DetailItem
                icon={Mail}
                label="Email Address"
                value={email}
              />

              <DetailItem
                icon={Phone}
                label="Phone Number"
                value={phone}
              />

              <DetailItem
                icon={CalendarDays}
                label="Date Joined"
                value={formatDate(createdAt)}
              />
            </div>
          </div>

          {/* Performance Information */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
              Seller Performance
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Package size={17} />
                  <span className="text-sm">Total Products</span>
                </div>

                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {totalProducts}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <IndianRupee size={17} />
                  <span className="text-sm">Total Sales</span>
                </div>

                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {formatCurrency(totalSales)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerViewModal;

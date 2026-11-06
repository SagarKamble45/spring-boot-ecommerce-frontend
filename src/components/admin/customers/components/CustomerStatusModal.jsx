import {
  X,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
} from "lucide-react";

const CustomerStatusModal = ({
  isOpen,
  customer,
  onClose,
  onConfirm,
  isUpdating = false,
}) => {
  if (!isOpen || !customer) return null;

  const isCurrentlyActive = customer.status === "ACTIVE";
  const nextStatus = isCurrentlyActive ? "INACTIVE" : "ACTIVE";

  const handleConfirm = () => {
    onConfirm?.(customer);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isUpdating) {
          onClose?.();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {isCurrentlyActive ? "Deactivate Customer" : "Activate Customer"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
              isCurrentlyActive
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {isCurrentlyActive ? (
              <ShieldAlert size={28} />
            ) : (
              <ShieldCheck size={28} />
            )}
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-base font-bold text-slate-900">
              {isCurrentlyActive
                ? "Are you sure you want to deactivate this customer?"
                : "Are you sure you want to activate this customer?"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to change the account status of{" "}
              <span className="font-semibold text-slate-800">
                {customer.customerName}
              </span>
              .
            </p>
          </div>

          {/* Status Preview */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                {isCurrentlyActive ? (
                  <UserX size={19} />
                ) : (
                  <UserCheck size={19} />
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {customer.customerName}
                </p>
                <p className="text-xs text-slate-500">
                  {customer.email}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                nextStatus === "ACTIVE"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {nextStatus}
            </span>
          </div>

          {/* Warning / Information */}
          <div
            className={`mt-4 rounded-xl p-4 text-sm leading-6 ${
              isCurrentlyActive
                ? "border border-red-100 bg-red-50 text-red-700"
                : "border border-green-100 bg-green-50 text-green-700"
            }`}
          >
            {isCurrentlyActive ? (
              <>
                <p className="font-semibold">What happens after deactivation?</p>
                <p className="mt-1">
                  This account will be marked inactive. Once backend
                  enforcement is connected, this customer will not be able to
                  place new orders. Existing orders and customer history will
                  be preserved.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold">What happens after activation?</p>
                <p className="mt-1">
                  This account will be marked active and will be eligible to
                  place new orders once the backend status check is connected.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isUpdating}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              isCurrentlyActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isUpdating
              ? "Updating..."
              : isCurrentlyActive
                ? "Deactivate Customer"
                : "Activate Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatusModal;
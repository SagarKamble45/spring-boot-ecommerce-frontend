
import { Eye, Ban, CheckCircle } from "lucide-react";
import CustomerStatusBadge from "./CustomerStatusBadge";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CustomerTableRow = ({
  customer,
  onView,
  onToggleStatus,
}) => {
  const isActive = customer.status === "ACTIVE";

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50/80">
      {/* Customer */}
      <td className="px-5 py-4">
        <div className="flex min-w-48 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {getInitials(customer.customerName)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {customer.customerName}
            </p>
            <p className="text-xs text-slate-400">
              ID: #{customer.customerId}
            </p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-5 py-4">
        <p className="whitespace-nowrap text-sm text-slate-700">
          {customer.email}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {customer.phone || "No phone"}
        </p>
      </td>

      {/* Orders */}
      <td className="px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-700">
          {customer.totalOrders ?? 0}
        </span>
      </td>

      {/* Spending */}
      <td className="px-5 py-4">
        <span className="whitespace-nowrap text-sm font-semibold text-slate-800">
          {formatCurrency(customer.totalSpent)}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <CustomerStatusBadge status={customer.status} />
      </td>

      {/* Joined */}
      <td className="px-5 py-4">
        <span className="whitespace-nowrap text-sm text-slate-600">
          {formatDate(customer.createdAt)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onView(customer)}
            title="View customer"
            aria-label="View customer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={() => onToggleStatus(customer)}
            title={isActive ? "Deactivate customer" : "Activate customer"}
            aria-label={isActive ? "Deactivate customer" : "Activate customer"}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
              isActive
                ? "border-rose-100 text-rose-500 hover:bg-rose-50"
                : "border-emerald-100 text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            {isActive ? (
              <Ban size={17} />
            ) : (
              <CheckCircle size={17} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerTableRow;

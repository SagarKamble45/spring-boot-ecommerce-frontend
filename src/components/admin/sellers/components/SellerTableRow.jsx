
import { Eye, Pencil, Trash2, Store } from "lucide-react";
import SellerStatusBadge from "./SellerStatusBadge";

const SellerTableRow = ({
  seller,
  onView,
  onEdit,
  onDelete,
}) => {
  const {
    sellerId,
    sellerName,
    email,
    storeName,
    totalProducts = 0,
    totalSales = 0,
    createdAt,
    status,
  } = seller;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatSales = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50/70">
      {/* Seller */}
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Store size={19} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {sellerName || "Unknown Seller"}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              ID: #{sellerId}
            </p>
          </div>
        </div>
      </td>

      {/* Store */}
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-slate-700">
          {storeName || "—"}
        </p>
      </td>

      {/* Email */}
      <td className="px-5 py-4">
        <p className="max-w-[220px] truncate text-sm text-slate-600">
          {email || "—"}
        </p>
      </td>

      {/* Products */}
      <td className="px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-700">
          {totalProducts}
        </span>
      </td>

      {/* Sales */}
      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-700">
        {formatSales(totalSales)}
      </td>

      {/* Joined Date */}
      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
        {formatDate(createdAt)}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <SellerStatusBadge status={status} />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => onView?.(seller)}
            title="View seller"
            aria-label="View seller"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={() => onEdit?.(seller)}
            title="Edit seller"
            aria-label="Edit seller"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(seller)}
            title="Delete seller"
            aria-label="Delete seller"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SellerTableRow;

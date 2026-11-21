
import { Package, ChevronRight } from "lucide-react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyle = (status = "") => {
  const value = status.toLowerCase();

  if (value.includes("deliver")) {
    return "bg-success/10 text-success";
  }

  if (value.includes("cancel")) {
    return "bg-danger/10 text-danger";
  }

  if (
    value.includes("pending") ||
    value.includes("process") ||
    value.includes("accept") ||
    value.includes("ship")
  ) {
    return "bg-warning/10 text-warning";
  }

  return "bg-muted text-text-light";
};

const getDisplayStatus = (status = "") => {
  const value = status.toLowerCase();

  if (value.includes("deliver")) return "Delivered";
  if (value.includes("cancel")) return "Cancelled";

  if (
    value.includes("pending") ||
    value.includes("process") ||
    value.includes("accept") ||
    value.includes("ship")
  ) {
    return "In progress";
  }

  return status || "Status unavailable";
};

function MyOrderCard({ order }) {
  const orderItems = order?.orderItems || [];
  const firstItem = orderItems[0];
  const remainingItems = Math.max(orderItems.length - 1, 0);

  return (
    <article className="group rounded-xl border border-border bg-surface px-4 py-4 shadow-card transition hover:border-primary/30 sm:px-5">

      {/* Status and date */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusStyle(
            order?.orderStatus
          )}`}
        >
          <span className="mr-1">●</span>
          {getDisplayStatus(order?.orderStatus)}
        </span>

        <span className="h-4 w-px bg-border" />

        <span className="text-xs text-text-light">
          {formatDate(order?.orderDate)}
        </span>
      </div>

      {/* Product and order details */}
      <div className="mt-4 flex items-center gap-3 sm:gap-4">

        {/* Product thumbnail */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
          {firstItem?.product?.image ? (
            <img
              src={firstItem.product.image}
              alt={firstItem.product.productName || "Product"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package size={22} className="text-text-light" />
            </div>
          )}

          {remainingItems > 0 && (
            <span className="absolute bottom-0 right-0 rounded-tl-md bg-text/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
              +{remainingItems}
            </span>
          )}
        </div>

        {/* Order information */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-primary sm:text-sm">
            Order ID: #{order?.orderId}
          </p>

          <p className="mt-1 truncate text-xs text-text-light sm:text-sm">
            {firstItem?.product?.productName || "Order items"}
            {remainingItems > 0 && ` & ${remainingItems} more items`}
          </p>

          <p className="mt-1 text-sm font-semibold text-text">
            {formatCurrency(order?.totalAmount)}
          </p>
        </div>

        <ChevronRight
          size={21}
          className="shrink-0 text-primary transition group-hover:translate-x-1"
        />
      </div>
    </article>
  );
}

export default MyOrderCard;

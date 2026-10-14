import { Package } from "lucide-react";

import { DetailList } from "../../shared/DetailsDrawer";

import { formatAmount } from "./utils/orderFormat";

import { StatusBadge } from "./StatusBadge";
import PaymentLabel from "./PaymentLabel";
import UpdateOrderStatusForm from "./UpdateOrderStatusForm";

/* ------------------------------------------------------------------ */
/*  Order details (content shown inside the shared DetailsDrawer)     */
/* ------------------------------------------------------------------ */
function OrderDrawer({
  order,
  onStatusUpdated,
}) {
  const items = order.raw?.orderItems ?? [];

  return (
    <>
      {/* Total + current status */}
      <div className="flex items-end justify-between rounded-xl bg-slate-50 p-4">
        <div>
          <p className="text-xs text-slate-500">Order total</p>

          <p className="text-2xl font-semibold tabular-nums text-slate-900">
            {formatAmount(order.totalAmount)}
          </p>
        </div>

        <StatusBadge status={order.status} />
      </div>

      <DetailList
        items={[
          [
            "Customer",
            <span key="customer-name" className="capitalize">
              {order.UserName || "—"}
            </span>,
          ],
          ["Email", order.email || "—"],
          [
            "Payment",
            <PaymentLabel
              key="payment-method"
              name={order.PgName}
            />,
          ],
        ]}
      />

      <UpdateOrderStatusForm
        order={order}
        onSuccess={onStatusUpdated}
      />

      {items.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-semibold text-slate-900">
            Items ({items.length})
          </h3>

          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
            {items.map((item, index) => (
              <li
                key={item.orderItemId ?? index}
                className="flex items-center gap-3 p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Package className="h-5 w-5 text-slate-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {item.product?.productName ??
                      item.productName ??
                      "Product"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Qty {item.quantity ?? 1}
                  </p>
                </div>

                {item.orderedProductPrice != null && (
                  <span className="text-sm tabular-nums text-slate-700">
                    {formatAmount(item.orderedProductPrice)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default OrderDrawer;
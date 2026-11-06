import { ShoppingBag } from "lucide-react";

const STATUS_STYLES = {
  DELIVERED: "bg-green-50 text-green-700",
  SHIPPED: "bg-blue-50 text-blue-700",
  PROCESSING: "bg-amber-50 text-amber-700",
  CANCELLED: "bg-red-50 text-red-700",
  PENDING: "bg-slate-100 text-slate-600",
};

const CustomerOrderHistory = ({ orders = [] }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
        <ShoppingBag size={32} className="mx-auto text-slate-300" />
        <p className="mt-3 font-semibold text-slate-700">
          No orders yet
        </p>
        <p className="mt-1 text-sm text-slate-400">
          This customer hasn't placed any orders.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100">
      <table className="w-full min-w-[650px] text-left">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-400">
            <th className="px-5 py-4 font-semibold">Order ID</th>
            <th className="px-5 py-4 font-semibold">Date</th>
            <th className="px-5 py-4 font-semibold">Items</th>
            <th className="px-5 py-4 font-semibold">Amount</th>
            <th className="px-5 py-4 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.orderId} className="text-sm">
              <td className="px-5 py-4 font-semibold text-blue-600">
                {order.orderId}
              </td>

              <td className="px-5 py-4 text-slate-600">
                {new Date(order.orderDate).toLocaleDateString("en-IN")}
              </td>

              <td className="px-5 py-4 text-slate-600">
                {order.items}
              </td>

              <td className="px-5 py-4 font-semibold text-slate-800">
                {formatCurrency(order.amount)}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    STATUS_STYLES[order.status] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrderHistory;
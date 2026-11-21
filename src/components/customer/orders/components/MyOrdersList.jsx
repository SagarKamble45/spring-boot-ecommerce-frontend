
import MyOrderCard from "./MyOrderCard";

function MyOrdersList({ orders = [], totalOrders = 0 }) {
  if (!orders.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {orders.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {totalOrders}
          </span>{" "}
          orders
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <MyOrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </section>
  );
}

export default MyOrdersList;

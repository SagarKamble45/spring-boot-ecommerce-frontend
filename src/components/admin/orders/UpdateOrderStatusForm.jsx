import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { StatusBadge } from "./StatusBadge";
import { KNOWN_STATUSES } from "./utils/orderConstants";
import { updateOrderStatus } from "../../../store/action";
import useOrderFilter from "../../../hooks/useOrderFilter";




function UpdateOrderStatusForm({
  order,
  onSuccess,
  updatingStatus = false,
}) {
  const { queryString } = useOrderFilter();
  const [nextStatus, setNextStatus] = useState(order.status ?? "");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  // Update the selected dropdown value when the user opens another order.
  useEffect(() => {
    setNextStatus(order.status ?? "");
    setError("");
  }, [order.id, order.status]);

  const statusHasChanged =
    !!nextStatus && nextStatus !== order.status;

  const isUpdating = loader || updatingStatus;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nextStatus) {
      setError("Order status is required");
      return;
    }

    if (!statusHasChanged || isUpdating) {
      return;
    }

    setError("");

    try {
      // Wait for both API PUT and getOrdersForDashboard() to finish.
      await dispatch(
        updateOrderStatus(
          order.id,
          nextStatus,
          queryString,
          toast,
          setLoader
        )
      );

      // This calls the callback passed by OrdersTable through OrderDrawer.
      onSuccess?.({
        orderId: order.id,
        status: nextStatus,
      });
    } catch (requestError) {
      console.error("Status update failed:", requestError);
    }
  };

  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Update order status
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            Current status: {order.status || "—"}
          </p>
        </div>

        <StatusBadge status={order.status} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <select
          value={nextStatus}
          onChange={(event) => {
            setNextStatus(event.target.value);
            setError("");
          }}
          aria-label="New order status"
          disabled={isUpdating}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="" disabled>
            Select a status
          </option>

          {KNOWN_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!statusHasChanged || isUpdating}
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isUpdating ? "Updating..." : "Update status"}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default UpdateOrderStatusForm;
import { Calendar, ChevronDown } from "lucide-react";
import OrdersStatCards from "./OrdersStatCards";
import OrdersTable from "./OrdersTable";
import OrderStatusOverview from "./OrderStatusOverview";
import RecentOrdersWidget from "./RecentOrdersWidget";
import useOrderFilter from "../../../hooks/useOrderFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderStats,
  fetchRecentOrders,
} from "../../../store/action";
import { useEffect, useState } from "react";

function Orders() {
  const dispatch = useDispatch();

  const {
    adminOrders,
    pagination,
    orderStats,
    recentOrders,
  } = useSelector((state) => state.order);

  const { isloading, errorMessage } = useSelector(
    (state) => state.errors
  );

  useOrderFilter();

  useEffect(() => {
    dispatch(fetchOrderStats());
    dispatch(fetchRecentOrders());
  }, [dispatch]);

  const [showAllOrders, setShowAllOrders] = useState(false);

  return (
    /*
     * AdminLayout already provides the page background and padding, so no
     * min-h-screen / p-6 / max-w here (they caused the extra page scroll).
     */
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Track and manage all customer orders from your store.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm sm:self-auto"
        >
          <Calendar className="h-4 w-4 text-slate-400" />
          Apr 8, 2025 – Apr 14, 2025
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Stat cards */}
      <OrdersStatCards orderStats={orderStats} />

      {/* Orders table and sidebar */}
      <div
        className={`grid gap-4 ${
          showAllOrders
            ? "grid-cols-1"
            : "xl:h-[calc(100vh-14rem)] xl:min-h-[40rem] xl:grid-cols-[minmax(0,1fr)_20rem] xl:grid-rows-1"
        }`}
      >
        {/* Expanded orders table */}
        <div className="flex min-h-0 min-w-0 flex-col">
          {showAllOrders && (
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowAllOrders(false)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Back to overview
              </button>
            </div>
          )}

          <OrdersTable
            orders={adminOrders}
            loading={isloading}
            error={errorMessage}
            pagination={{
              page: (pagination?.pageNumber ?? 0) + 1,
              pageSize: pagination?.pageSize,
              totalElements: pagination?.totalElements,
            }}
          />
        </div>

        {/* Hide dashboard widgets when viewing all orders */}
        {!showAllOrders && (
          <div className="grid content-start gap-4 sm:grid-cols-2 xl:min-h-0 xl:grid-cols-1 xl:overflow-y-auto">
            <OrderStatusOverview orderStats={orderStats} />

            <RecentOrdersWidget
              orders={recentOrders}
              onViewAll={() => setShowAllOrders(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
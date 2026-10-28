import { Calendar, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import OrdersStatCards from "./OrdersStatCards";
import OrdersTable from "./OrdersTable";
import OrderStatusOverview from "./OrderStatusOverview";
import RecentOrdersWidget from "./RecentOrdersWidget";

import useOrderFilter from "../../../hooks/useOrderFilter";
import { fetchOrderStats, fetchRecentOrders } from "../../../store/action";

import Loader from "../../shared/Loader";

function Orders() {
  const dispatch = useDispatch();

  const {
    adminOrders = [],
    pagination = {},
    orderStats = {},
    recentOrders = [],

    ordersLoading,
    ordersError,

    orderStatsLoading,
    orderStatsError,

    recentOrdersLoading,
    recentOrdersError,
  } = useSelector((state) => state.order);

  useOrderFilter();

  useEffect(() => {
    dispatch(fetchOrderStats());
    dispatch(fetchRecentOrders());
  }, [dispatch]);

  const [showAllOrders, setShowAllOrders] = useState(false);

  // Show the full-page loader while initial data is being fetched.
  const initialLoading =
    (ordersLoading && adminOrders.length === 0) ||
    (orderStatsLoading && Object.keys(orderStats).length === 0) ||
    (recentOrdersLoading && recentOrders.length === 0);

  if (initialLoading) {
    return <Loader text="Loading orders..." />;
  }

  return (
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

      {/* Order statistics */}
      {orderStatsLoading ? (
        <Loader text="Loading order statistics..." />
      ) : orderStatsError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {orderStatsError}
        </div>
      ) : (
        <OrdersStatCards orderStats={orderStats} />
      )}

      {/* Orders table and sidebar */}
      <div
        className={`grid gap-4 ${
          showAllOrders
            ? "grid-cols-1"
            : "xl:h-[calc(100vh-14rem)] xl:min-h-[40rem] xl:grid-cols-[minmax(0,1fr)_20rem] xl:grid-rows-1"
        }`}
      >
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
            loading={ordersLoading}
            error={ordersError}
            pagination={{
              page: (pagination.pageNumber ?? 0) + 1,
              pageSize: pagination.pageSize,
              totalElements: pagination.totalElements,
            }}
          />
        </div>

        {/* Dashboard widgets */}
        {!showAllOrders && (
          <div className="grid content-start gap-4 sm:grid-cols-2 xl:min-h-0 xl:grid-cols-1 xl:overflow-y-auto">
            {/* Order status overview */}
            {orderStatsError ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                Order status overview is unavailable.
              </div>
            ) : (
              <OrderStatusOverview orderStats={orderStats} />
            )}

            {/* Recent orders */}
            {recentOrdersLoading ? (
              <Loader text="Loading recent orders..." />
            ) : recentOrdersError ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {recentOrdersError}
              </div>
            ) : (
              <RecentOrdersWidget
                orders={recentOrders}
                onViewAll={() => setShowAllOrders(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;

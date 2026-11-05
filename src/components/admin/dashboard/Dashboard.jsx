
import React, { useEffect } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  Box,
  RefreshCw,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import DashboardOverview from "./DashboardOverview";
import SalesOverview from "./SalesOverview";
import RecentOrders from "./RecentOrders";
import QuickActions from "./QuickActions";
import FeatureError from "../shared/FeatureError";

import {
  analyticsAction,
  getSalesOverview,
} from "../../../store/action";

function Dashboard() {
  const dispatch = useDispatch();

  const name = useSelector(
    (state) => state.auth.user?.username || "Admin"
  );

  const {
    analytics = {},
    analyticsLoading,
    analyticsError,
    salesOverview = [],
    salesOverviewLoading,
    salesOverviewError,
  } = useSelector((state) => state.admin);

  const {
    productCount,
    totalRevenue,
    totalOrders,
    totalCustomers,
  } = analytics;

  const hasAnalytics = Object.keys(analytics ?? {}).length > 0;

  useEffect(() => {
    dispatch(analyticsAction());
    dispatch(getSalesOverview());
  }, [dispatch]);

  const retryAnalytics = () => {
    if (!analyticsLoading) {
      dispatch(analyticsAction());
    }
  };

  const retrySales = () => {
    if (!salesOverviewLoading) {
      dispatch(getSalesOverview());
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">

      {/* Dashboard Header */}
      <div>
        <p className="text-gray-400 text-sm">
          Welcome back,
        </p>

        <h1 className="text-2xl font-semibold text-slate-900">
          {name}
        </h1>

        <p className="mt-0.5 text-sm text-slate-500">
          Here's what's happening with your store today.
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {today}
        </p>
      </div>

      {/* Store Overview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Store Overview
            </h2>

            <p className="text-sm text-slate-500 mt-0.5">
              Your store's key performance metrics.
            </p>
          </div>

          {/* One refresh button for all four cards */}
          <button
            type="button"
            onClick={retryAnalytics}
            disabled={analyticsLoading}
            title="Refresh statistics"
            aria-label="Refresh statistics"
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={17}
              className={analyticsLoading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* One shared error instead of four card errors */}
        {analyticsError && (
          <div className="mb-4">
            <FeatureError
              title="Unable to load store statistics"
              message={String(analyticsError)}
              compact
            />
          </div>
        )}

        {/* Statistics cards */}
        {analyticsLoading && !hasAnalytics ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["orders", "revenue", "customers", "products"].map((item) => (
              <DashboardOverview
                key={item}
                loading
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardOverview
              title="Total Orders"
              amount={totalOrders}
              loading={analyticsLoading}
              icon={<ShoppingCart size={20} />}
            />

            <DashboardOverview
              title="Total Revenue"
              amount={totalRevenue}
              revenue
              loading={analyticsLoading}
              icon={<Box size={20} />}
            />

            <DashboardOverview
              title="Total Customers"
              amount={totalCustomers}
              loading={analyticsLoading}
              icon={<Users size={20} />}
            />

            <DashboardOverview
              title="Total Products"
              amount={productCount}
              loading={analyticsLoading}
              icon={<Package size={20} />}
            />
          </div>
        )}
      </section>

      {/* Sales Overview and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <SalesOverview
            salesData={salesOverview}
            loading={salesOverviewLoading}
            error={salesOverviewError}
            onRetry={retrySales}
          />
        </div>

        <div>
          <RecentOrders />
        </div>

      </div>

      {/* Quick Actions */}
      <QuickActions />

    </div>
  );
}

export default Dashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package, Users, Box, RefreshCw } from "lucide-react";

import DashboardOverview from "./components/DashboardOverview";
import SalesOverview from "./components/SalesOverview";
import QuickActions from "./components/QuickActions";
import TopCategories from "./components/TopCategories";

import RecentOrdersWidget from "../orders/RecentOrdersWidget";
import OrderStatusOverview from "../orders/OrderStatusOverview";
import FeatureError from "../shared/FeatureError";

import DashboardHeader from "./components/DashboardHeader";

import {
  analyticsAction,
  getSalesOverview,
  fetchOrderStats,
  fetchRecentOrders,
  fetchCategoryDistribution,
} from "../../../store/action";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector((state) => state.auth.user?.username || "Admin");

  const {
    analytics = {},
    analyticsLoading,
    analyticsError,
    salesOverview = [],
    salesOverviewLoading,
    salesOverviewError,
  } = useSelector((state) => state.admin);

  const {
    orderStats = {},
    orderStatsLoading,
    orderStatsError,
    recentOrders = [],
    recentOrdersLoading,
    recentOrdersError,
  } = useSelector((state) => state.order);

  const {
    categoryDistribution = [],
    categoryDistributionLoading,
    categoryDistributionError,
  } = useSelector((state) => state.category);

  const { productCount, totalRevenue, totalOrders, totalCustomers } = analytics;

  const hasAnalytics = Object.keys(analytics).length > 0;

  useEffect(() => {
    dispatch(analyticsAction());
    dispatch(getSalesOverview());
    dispatch(fetchOrderStats());
    dispatch(fetchRecentOrders());
    dispatch(fetchCategoryDistribution());
  }, [dispatch]);

  const retryAnalytics = () => {
    if (!analyticsLoading) dispatch(analyticsAction());
  };

  const retrySales = () => {
    if (!salesOverviewLoading) dispatch(getSalesOverview());
  };

  const retryOrderStats = () => {
    if (!orderStatsLoading) dispatch(fetchOrderStats());
  };

  const retryRecentOrders = () => {
    if (!recentOrdersLoading) dispatch(fetchRecentOrders());
  };

  const retryCategories = () => {
    if (!categoryDistributionLoading) {
      dispatch(fetchCategoryDistribution());
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
      <DashboardHeader
        name={name}
        today={today}
        onRefresh={() => {
          retryAnalytics();
          retrySales();
          retryOrderStats();
          retryRecentOrders();
          retryCategories();
        }}
        refreshing={
          analyticsLoading ||
          salesOverviewLoading ||
          orderStatsLoading ||
          recentOrdersLoading ||
          categoryDistributionLoading
        }
      />

      {/* KPI Cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Store Overview
          </h2>
          <p className="text-sm text-slate-500">
            Your store's key performance metrics.
          </p>
        </div>

        {analyticsError && (
          <div className="mb-4">
            <FeatureError
              title="Unable to load store statistics"
              message={String(analyticsError)}
              onRetry={retryAnalytics}
              compact
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardOverview
            title="Total Revenue"
            amount={totalRevenue}
            revenue
            loading={analyticsLoading}
            icon={<Box size={20} />}
          />

          <DashboardOverview
            title="Total Orders"
            amount={totalOrders}
            loading={analyticsLoading}
            icon={<ShoppingCart size={20} />}
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
      </section>

      {/* Sales and Order Status */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="min-w-0 xl:col-span-3">
          <SalesOverview
            salesData={salesOverview}
            loading={salesOverviewLoading}
            error={salesOverviewError}
            onRetry={retrySales}
          />
        </div>

        <div className="min-w-0 xl:col-span-2">
          <OrderStatusOverview
            orderStats={orderStats}
            loading={orderStatsLoading}
            error={orderStatsError}
            onRetry={retryOrderStats}
          />
        </div>
      </section>

      {/* Quick Actions, Recent Orders and Categories */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0">
          <QuickActions />
        </div>

        <div className="min-w-0">
          <RecentOrdersWidget
            orders={recentOrders}
            loading={recentOrdersLoading}
            error={recentOrdersError}
            onRetry={retryRecentOrders}
            onViewAll={() => navigate("/admin/orders")}
          />
        </div>

        <div className="min-w-0">
          <TopCategories
            categories={categoryDistribution}
            loading={categoryDistributionLoading}
            error={categoryDistributionError}
            onRetry={retryCategories}
            onViewAll={() => navigate("/admin/categories")}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

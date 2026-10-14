import React, { useEffect } from "react";

import { ShoppingCart, Package, Users, Box } from "lucide-react";
import DashboardOverview from "./DashboardOverview";
import SalesOverview from "./SalesOverview";
import RecentOrders from "./RecentOrders";
import QuickActions from "./QuickActions";
import { useDispatch, useSelector } from "react-redux";
import { analyticsAction, getSalesOverview } from "../../../store/action";
import Loader from "../../shared/Loader";
import ErrorPage from "../../shared/ErrorPage";

function Dashboard() {
  const dispatch = useDispatch();
  const { isloading, errorMessage } = useSelector((state) => state.errors);
  const name = useSelector((state)=>state.auth.user.username);

  const { analytics: { productCount, totalRevenue, totalOrders, totalCustomers } } = useSelector((state) => state.admin);
const { salesOverview  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(analyticsAction());
    dispatch(getSalesOverview());

  }, [dispatch]);

  if (isloading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorPage errorMessage={errorMessage} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-400 text-sm">
            Here's what's happening with your store today.
          </p>
        </div>
        <button className="border border-gray-200 bg-white rounded-xl px-4 py-2 text-sm text-gray-600 self-start sm:self-auto">
          April 14, 2025 ▾
        </button>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardOverview
          title="Total Orders"
          amount={totalOrders}
          icon={<ShoppingCart size={20} />}
        />
        <DashboardOverview
          title="Total Revenue"
          amount={totalRevenue}
          revenue
          icon={<Box size={20} />}
        />
        <DashboardOverview
          title="Total Customers"
          amount={totalCustomers}
          icon={<Users size={20} />}
        />
        <DashboardOverview
          title="Total Products"
          amount={productCount}
          icon={<Package size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesOverview  salesData={salesOverview}/>
        </div>
        <div>
          <RecentOrders />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}

export default Dashboard;

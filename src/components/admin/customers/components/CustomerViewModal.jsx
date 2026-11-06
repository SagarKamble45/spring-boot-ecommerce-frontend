import { useState } from "react";
import {
  X,
  UserRound,
  LayoutDashboard,
  MapPin,
  ShoppingBag,
  Activity,
} from "lucide-react";

import CustomerStatusBadge from "./CustomerStatusBadge";
import CustomerOverview from "./CustomerOverview";
import CustomerPersonalDetails from "./CustomerPersonalDetails";
import CustomerAddresses from "./CustomerAddresses";
import CustomerOrderHistory from "./CustomerOrderHistory";
import CustomerActivity from "./CustomerActivity";

import { MOCK_CUSTOMER_DETAILS } from "../data/customerData";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "personal", label: "Personal Details", icon: UserRound },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "orders", label: "Order History", icon: ShoppingBag },
  { id: "activity", label: "Activity", icon: Activity },
];

const CustomerViewModal = ({ isOpen, onClose, customer }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen || !customer) return null;

  const details = MOCK_CUSTOMER_DETAILS[customer.customerId] || {};

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <CustomerPersonalDetails
            customer={customer}
            details={details}
          />
        );

      case "addresses":
        return (
          <CustomerAddresses
            addresses={details.addresses || []}
          />
        );

      case "orders":
        return (
          <CustomerOrderHistory
            orders={details.orders || []}
          />
        );

      case "activity":
        return (
          <CustomerActivity
            activities={details.activities || []}
          />
        );

      default:
        return (
          <CustomerOverview
            customer={customer}
            details={details}
          />
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Customer Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View customer profile, addresses and purchase history.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Customer Profile */}
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
                {customer.customerName
                  ?.split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-slate-900">
                  {customer.customerName}
                </h3>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {customer.email}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Customer ID: #{customer.customerId}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <CustomerStatusBadge status={customer.status} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto border-b border-slate-100 px-4 sm:px-6">
          <div className="flex min-w-max gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-3 py-4 text-sm font-semibold transition ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerViewModal;
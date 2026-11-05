
import React from "react";
import {
  ShoppingCart,
  Users,
  Box,
  Store,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    title: "Manage Products",
    desc: "Add, edit or remove products",
    path: "/admin/products",
    icon: Box,
  },
  {
    title: "View Orders",
    desc: "Track and manage orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Manage Customers",
    desc: "View customer list",
    path: "/admin/customers",
    icon: Users,
  },
  {
    title: "Manage Sellers",
    desc: "View and manage sellers",
    path: "/admin/sellers",
    icon: Store,
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Quick Actions
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Frequently used shortcuts
        </p>
      </div>

      <div className="space-y-2">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              onClick={() => navigate(action.path)}
              className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-blue-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">
                  {action.title}
                </p>
                <p className="truncate text-xs text-slate-400">
                  {action.desc}
                </p>
              </div>

              <ChevronRight
                size={17}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;

import React from "react";
import { FaCouch, FaTachometerAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { adminNavigation } from "../../utils";
import clsx from "clsx";

function Sidebar() {
  const pathName = useLocation().pathname;

  return (
    <div className="flex flex-col h-full w-full bg-white px-6 py-6 overflow-y-auto">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 pb-6 border-b border-slate-100">
        <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
          <FaTachometerAlt className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Admin Panel</h1>
          <p className="text-xs text-slate-400">E-Commerce Store</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-1.5">
          {adminNavigation.map((item) => {
            const isActive =
              pathName === item.href ||
              (item.href !== "/admin" && pathName.startsWith(item.href));

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={clsx(
                    "group relative flex items-center gap-3.5",
                    "h-11 rounded-xl px-4",
                    "text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon
                    className={clsx(
                      "text-lg flex-shrink-0 transition-colors",
                      isActive
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Card */}
      <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 border border-blue-100/60">
        <div className="absolute -right-6 -bottom-8 h-28 w-28 rounded-full bg-blue-100/50" />
        <div className="relative z-10">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <FaCouch className="text-sm" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Better Homes</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            Manage products, categories, and orders seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

import React from "react";
import { CalendarDays, RefreshCw } from "lucide-react";

function DashboardHeader({
  name = "Admin",
  today,
  onRefresh,
  refreshing = false,
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-white via-blue-50 to-indigo-50 p-6 shadow-sm sm:p-8">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-indigo-100/40 blur-2xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Welcome Content */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="text-xs font-semibold tracking-wide text-blue-700">
              ADMIN DASHBOARD
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {name}!
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Here's your store overview. Monitor performance,
            manage operations, and keep everything running smoothly.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <CalendarDays size={16} className="text-blue-600" />
            {today}
          </div>
        </div>

        {/* Refresh Action */}
        <div className="relative">
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh Dashboard"}
          </button>
        </div>

      </div>
    </section>
  );
}

export default DashboardHeader;

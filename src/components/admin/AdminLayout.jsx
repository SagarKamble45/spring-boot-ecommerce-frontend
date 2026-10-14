import React, { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { MdAdminPanelSettings } from "react-icons/md";
import Sidebar from "../shared/Sidebar";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  DialogBackdrop,
} from "@headlessui/react";

const DESKTOP_QUERY = "(min-width: 1024px)"; // Tailwind `lg`

function AdminLayout() {
  // Desktop: sidebar is docked and visible by default, can be minimized
  const [desktopOpen, setDesktopOpen] = useState(true);
  // Mobile/tablet: slide-over drawer with blur backdrop
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => e.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleToggle = useCallback(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setDesktopOpen((prev) => !prev);
    } else {
      setMobileOpen(true);
    }
  }, []);

  return (
    <div className="relative bg-slate-50 pb-20">
      {/* ---------- Desktop docked sidebar (no backdrop, no blur) ---------- */}
      <aside
        className={`
          fixed bottom-0 left-0 top-20 z-30 hidden w-72 flex-col overflow-hidden
          border-r border-slate-200 bg-white shadow-sm
          transition-transform duration-300 ease-in-out lg:flex
          ${desktopOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-hidden={!desktopOpen}
      >
        {/* Sidebar itself should own the scrolling (h-full overflow-y-auto) */}
        <Sidebar closeMobileMenu={() => {}} />
      </aside>

      {/* ---------- Mobile / tablet drawer (with blur backdrop) ---------- */}
      <Dialog
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-14 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <RxCross1 className="text-lg" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white shadow-2xl">
              <Sidebar closeMobileMenu={() => setMobileOpen(false)} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ---------- Floating admin button ---------- */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8">
        <button
          type="button"
          onClick={handleToggle}
          aria-label={desktopOpen ? "Minimize admin menu" : "Open admin menu"}
          aria-expanded={desktopOpen}
          className="
            group relative flex h-14 items-center overflow-hidden
            rounded-full bg-slate-900 pl-1.5 pr-1.5 text-white
            shadow-xl shadow-slate-900/30 ring-1 ring-white/10
            transition-all duration-300 ease-out
            hover:bg-slate-800 hover:pr-5 hover:shadow-2xl
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
            active:scale-95
          "
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-inner">
            <MdAdminPanelSettings className="text-2xl" aria-hidden="true" />
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
          </span>

          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-out group-hover:ml-3 group-hover:max-w-32 group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-32 group-focus-visible:opacity-100 max-sm:hidden">
            {desktopOpen ? "Minimize" : "Admin Panel"}
          </span>
        </button>
      </div>

      {/* ---------- Main content (shifts when desktop sidebar is docked) ---------- */}
      <main
        className={`
          p-4 transition-[padding] duration-300 ease-in-out sm:p-6 xl:p-8
          ${desktopOpen ? "lg:pl-[19rem] xl:pl-[20rem]" : "lg:pl-8"}
        `}
      >
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
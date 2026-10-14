import { X } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-xl",
  xl: "max-w-2xl",
};

/**
 * Reusable right-side slide-over panel (Headless UI Dialog).
 * Gives you the backdrop, slide animation, focus trap, Esc / click-outside to
 * close, a header with a close button, a scrollable body and an optional
 * sticky footer. You only supply the content.
 *
 * Props
 * - open:     boolean
 * - onClose:  () => void
 * - title:    node            – header title (also the dialog's accessible name)
 * - subtitle: node (optional) – small text under the title
 * - children: node            – body content (scrolls when long)
 * - footer:   node (optional) – sticky bottom area, e.g. action buttons
 * - size:     "sm" | "md" | "lg" | "xl"  (default "md")
 *
 * Tip: when the content comes from a clicked row, keep the clicked item in
 * state AFTER closing (only flip `open` to false). That way the content
 * doesn't disappear while the panel is sliding out.
 *
 * Example
 *   <DetailsDrawer open={open} onClose={() => setOpen(false)}
 *                  title="Product #12" subtitle="Added 3 Oct 2026">
 *     <DetailList items={[["Name", "Sofa"], ["Price", "₹12,999"]]} />
 *   </DetailsDrawer>
 */
export default function DetailsDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}) {
  return (
    // z-[60] sits above the sticky Navbar (z-50) and the admin menu button (z-40)
    <Dialog open={open} onClose={onClose} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-900/40 transition-opacity duration-300 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex justify-end">
        <DialogPanel
          transition
          className={`flex h-full w-full ${
            SIZES[size] ?? SIZES.md
          } transform flex-col bg-white shadow-2xl transition duration-300 ease-in-out data-closed:translate-x-full`}
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
            <div className="min-w-0">
              <DialogTitle className="truncate text-lg font-semibold text-slate-900">
                {title}
              </DialogTitle>
              {subtitle && (
                <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-5">{children}</div>

          {footer && (
            <div className="border-t border-slate-100 bg-white p-4">{footer}</div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

/**
 * Optional helper for the usual "label ........ value" rows inside a drawer.
 * items: Array<[label, value]>
 */
export function DetailList({ items = [] }) {
  return (
    <dl className="divide-y divide-slate-100 text-sm">
      {items.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-4 py-3">
          <dt className="text-slate-500">{label}</dt>
          <dd className="min-w-0 truncate text-right text-slate-800">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
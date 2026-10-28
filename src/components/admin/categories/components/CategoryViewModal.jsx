
import { Eye, X } from "lucide-react";
import CategoryStatusBadge from "./CategoryStatusBadge";

function CategoryViewModal({ isOpen, category, onClose }) {
  if (!isOpen || !category) return null;

  const categoryName =
    category.categoryName ?? category.name ?? "Unnamed Category";

  const categoryDescription =
    category.categoryDescription ?? category.description ?? "";

  const categoryId = category.categoryId ?? category.id ?? "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-view-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2
              id="category-view-title"
              className="text-lg font-bold text-slate-900"
            >
              Category Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View category information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close category details"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Eye size={26} />
            </div>

            <div className="min-w-0">
              <h3 className="break-words text-xl font-bold text-slate-900">
                {categoryName}
              </h3>

              <div className="mt-2">
                <CategoryStatusBadge
                  status={category.categoryStatus ?? category.status}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Description
            </p>
            <p className="mt-2 break-words text-sm leading-6 text-slate-700">
              {categoryDescription || "No description available."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm text-slate-500">Products</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {category.productCount ?? 0}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm text-slate-500">Category ID</p>
              <p className="mt-2 break-words text-lg font-bold text-slate-900">
                {categoryId}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryViewModal;

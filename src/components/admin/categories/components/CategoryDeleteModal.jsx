import { AlertTriangle, Trash2, X } from "lucide-react";

function CategoryDeleteModal({
  isOpen,
  category,
  onClose,
  onConfirm,
  isDeleting = false,
}) {
  if (!isOpen) return null;

  const categoryName =
    category?.categoryName ?? category?.name ?? "this category";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose?.();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        aria-describedby="delete-category-description"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2
                id="delete-category-title"
                className="text-lg font-semibold text-slate-900"
              >
                Delete Category
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Are you sure you want to delete this category?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close delete confirmation"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Warning */}
        <div className="mx-6 rounded-xl border border-rose-100 bg-rose-50/70 p-4">
          <p className="text-sm text-slate-700">
            You are about to delete{" "}
            <span className="font-semibold text-slate-900">
              {categoryName}
            </span>
            .
          </p>

          <p
            id="delete-category-description"
            className="mt-2 text-xs leading-5 text-slate-500"
          >
            This action may affect products assigned to this category.
            Please make sure you want to continue.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm?.(category)}
            disabled={isDeleting || !category}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryDeleteModal;

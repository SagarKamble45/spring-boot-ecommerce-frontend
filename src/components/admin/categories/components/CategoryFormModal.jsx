
import { useEffect, useState } from "react";
import { FolderPlus, X, Save } from "lucide-react";

function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  category = null,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("ACTIVE");
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(category);

  useEffect(() => {
    if (isOpen) {
      setCategoryName(
        category?.categoryName ?? category?.name ?? ""
      );

      setDescription(
        category?.categoryDescription ??
          category?.description ??
          ""
      );

      const existingStatus =
        category?.categoryStatus ?? category?.status;

      setCategoryStatus(
        String(existingStatus ?? "ACTIVE").toUpperCase() ===
          "INACTIVE"
          ? "INACTIVE"
          : "ACTIVE"
      );

      setErrors({});
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    const trimmedName = categoryName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      newErrors.categoryName = "Category name is required.";
    } else if (trimmedName.length < 5) {
      newErrors.categoryName =
        "Category name must contain at least 5 characters.";
    }

    if (trimmedDescription.length > 250) {
      newErrors.description =
        "Description cannot exceed 250 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit?.({
      categoryName: trimmedName,
      categoryDescription: trimmedDescription,
      categoryStatus,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FolderPlus size={22} />
            </div>

            <div>
              <h2
                id="category-modal-title"
                className="text-lg font-semibold text-slate-900"
              >
                {isEditMode ? "Edit Category" : "Add Category"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {isEditMode
                  ? "Update your category details."
                  : "Create a category for your products."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close category form"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5 px-6 py-6">
            {/* Category Name */}
            <div>
              <label
                htmlFor="categoryName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category Name
                <span className="ml-1 text-rose-500">*</span>
              </label>

              <input
                id="categoryName"
                type="text"
                value={categoryName}
                onChange={(event) => {
                  setCategoryName(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    categoryName: "",
                  }));
                }}
                placeholder="e.g. Electronics"
                maxLength={100}
                aria-invalid={Boolean(errors.categoryName)}
                aria-describedby={
                  errors.categoryName
                    ? "categoryName-error"
                    : undefined
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                  errors.categoryName
                    ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />

              {errors.categoryName && (
                <p
                  id="categoryName-error"
                  className="mt-1.5 text-xs text-rose-600"
                >
                  {errors.categoryName}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="categoryDescription"
                  className="text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <span className="text-xs text-slate-400">
                  {description.length}/250
                </span>
              </div>

              <textarea
                id="categoryDescription"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    description: "",
                  }));
                }}
                placeholder="Describe the products in this category..."
                rows={4}
                maxLength={250}
                aria-invalid={Boolean(errors.description)}
                className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                  errors.description
                    ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />

              {errors.description && (
                <p className="mt-1.5 text-xs text-rose-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category Status */}
            <div>
              <label
                htmlFor="categoryStatus"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category Status
              </label>

              <select
                id="categoryStatus"
                value={categoryStatus}
                onChange={(event) =>
                  setCategoryStatus(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <p className="text-xs leading-5 text-slate-400">
              Fields marked with * are required.
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save size={16} />
              {isEditMode ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryFormModal;

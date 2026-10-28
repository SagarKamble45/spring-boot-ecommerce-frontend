
import { Plus } from "lucide-react";

function CategoryHeader({ onAddCategory }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Categories
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Organize your products into categories for a better
          shopping experience.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddCategory}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Category
      </button>
    </div>
  );
}

export default CategoryHeader;

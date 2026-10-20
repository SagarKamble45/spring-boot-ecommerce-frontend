
import { Plus, Search, Tags } from "lucide-react";

function Categories() {
  return (
    <div className="space-y-4">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Categories
          </h1>

          <p className="mt-0.5 text-sm text-slate-500">
            Organize and manage your store categories.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Category summary */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <Tags className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total Categories
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              0
            </p>
          </div>
        </div>
      </div>

      {/* Search and category list will go here */}
    </div>
  );
}

export default Categories;

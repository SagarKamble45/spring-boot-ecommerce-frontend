
import { Eye, Pencil, Trash2, FolderOpen } from "lucide-react";
import CategoryStatusBadge from "./CategoryStatusBadge";

function CategoryTableRow({
  category,
  isSelected,
  onToggleSelect,
  onView,
  onEdit,
  onDelete,
}) {
  const categoryId = category.categoryId ?? category.id;
  const categoryName =
    category.categoryName ?? category.name ?? "Unnamed Category";
  const description =
    category.categoryDescription ?? category.description ?? "—";
  const productCount = Math.max(
    0,
    Number(category.productCount) || 0
  );
  const status = category.categoryStatus ?? category.status;

  return (
    <tr
      className={`transition hover:bg-slate-50/80 ${
        isSelected ? "bg-blue-50/50" : ""
      }`}
    >
      <td className="px-5 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(categoryId)}
          aria-label={`Select ${categoryName}`}
          className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
        />
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FolderOpen size={19} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {categoryName}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              ID: {categoryId ?? "—"}
            </p>
          </div>
        </div>
      </td>

      <td className="max-w-xs px-4 py-4">
        <p className="truncate text-sm text-slate-500">
          {description}
        </p>
      </td>

      <td className="px-4 py-4 text-center">
        <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1.5 text-sm font-semibold text-slate-700">
          {productCount}
        </span>
      </td>

      <td className="px-4 py-4">
        <CategoryStatusBadge status={status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onView?.(category)}
            title="View category"
            aria-label={`View ${categoryName}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={() => onEdit?.(category)}
            title="Edit category"
            aria-label={`Edit ${categoryName}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(category)}
            title="Delete category"
            aria-label={`Delete ${categoryName}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryTableRow;

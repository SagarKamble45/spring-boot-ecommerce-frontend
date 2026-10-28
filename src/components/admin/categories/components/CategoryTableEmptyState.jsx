import { FolderOpen } from "lucide-react";

function CategoryTableEmptyState({
  hasFilters = false,
}) {
  return (
    <tr>
      <td colSpan={6} className="px-5 py-16 text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FolderOpen size={26} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-800">
            No categories found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {hasFilters
              ? "Try changing your search or status filter."
              : "Your categories will appear here once they are available."}
          </p>
        </div>
      </td>
    </tr>
  );
}

export default CategoryTableEmptyState;
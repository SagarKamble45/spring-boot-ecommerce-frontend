import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductsPagination({
  page,
  totalPages,
  totalCount,
  rangeStart,
  rangeEnd,
  pageNumbers,
  onPageChange,
}) {
  const showEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <div className="flex flex-col gap-2 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-400">
        Showing {rangeStart} to {rangeEnd} of {totalCount} products
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`min-w-8 rounded-lg px-2.5 py-1 text-sm ${
              pageNumber === page
                ? "bg-blue-600 text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {showEllipsis && <span className="px-1 text-slate-400">…</span>}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
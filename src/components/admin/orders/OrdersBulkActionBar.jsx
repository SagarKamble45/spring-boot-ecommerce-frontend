import { Download } from "lucide-react";

export default function OrdersBulkActionBar({
  selectedCount,
  onExport,
  onClear,
}) {
  return (
    <div className="mx-4 my-3 flex items-center justify-between gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm">
      <span className="font-medium text-blue-700">
        {selectedCount} selected
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>

        <button
          type="button"
          onClick={onClear}
          className="rounded-lg px-2 py-1.5 font-medium text-blue-700 hover:bg-blue-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
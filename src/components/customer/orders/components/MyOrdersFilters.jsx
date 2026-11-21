
import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ArrowDownWideNarrow,
  Check,
} from "lucide-react";

const STATUS_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const SORT_OPTIONS = [
  { label: "Newest first", sortBy: "orderDate", sortOrder: "desc" },
  { label: "Oldest first", sortBy: "orderDate", sortOrder: "asc" },
  { label: "Highest amount", sortBy: "totalAmount", sortOrder: "desc" },
  { label: "Lowest amount", sortBy: "totalAmount", sortOrder: "asc" },
];

function MyOrdersFilters({
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  onStatusChange,
  onDateApply,
  onSortChange,
}) {
  const [dateOpen, setDateOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);

  useEffect(() => {
    setStartDate(fromDate);
    setEndDate(toDate);
  }, [fromDate, toDate]);

  const selectedSort =
    SORT_OPTIONS.find(
      (option) =>
        option.sortBy === sortBy &&
        option.sortOrder === sortOrder
    ) || SORT_OPTIONS[0];

  const handleDateApply = () => {
    if (startDate && endDate && startDate > endDate) return;

    onDateApply(startDate, endDate);
    setDateOpen(false);
  };

  const handleDateClear = () => {
    setStartDate("");
    setEndDate("");
    onDateApply("", "");
    setDateOpen(false);
  };

  return (
    <section>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        {/* Status tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_OPTIONS.map((option) => {
            const active = status === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onStatusChange(option.value)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-primary bg-surface text-primary"
                    : "border-border bg-surface text-text-light hover:border-primary/50 hover:text-primary"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Date and sorting controls */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Date range dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDateOpen((open) => !open);
                setSortOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs font-medium text-text transition hover:bg-border"
            >
              <CalendarDays size={14} className="text-text-light" />

              {fromDate || toDate
                ? "Date selected"
                : "Select date range"}

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  dateOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dateOpen && (
              <div className="absolute right-0 top-11 z-30 w-[280px] rounded-xl border border-border bg-surface p-4 shadow-card">
                <p className="mb-3 text-sm font-semibold text-text">
                  Order date range
                </p>

                <label className="mb-1 block text-xs text-text-light">
                  From date
                </label>

                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  className="mb-3 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                <label className="mb-1 block text-xs text-text-light">
                  To date
                </label>

                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {startDate && endDate && startDate > endDate && (
                  <p className="mt-2 text-xs text-danger">
                    From date cannot be after To date.
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleDateClear}
                    className="text-xs font-medium text-text-light transition hover:text-text"
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={handleDateApply}
                    disabled={
                      startDate && endDate && startDate > endDate
                    }
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Custom sorting dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSortOpen((open) => !open);
                setDateOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs font-medium text-text transition hover:bg-border"
            >
              <ArrowDownWideNarrow
                size={14}
                className="text-text-light"
              />

              {selectedSort.label}

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1.5 shadow-card">
                {SORT_OPTIONS.map((option) => {
                  const isSelected =
                    selectedSort.sortBy === option.sortBy &&
                    selectedSort.sortOrder === option.sortOrder;

                  return (
                    <button
                      key={`${option.sortBy}:${option.sortOrder}`}
                      type="button"
                      onClick={() => {
                        onSortChange(
                          option.sortBy,
                          option.sortOrder
                        );
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-xs transition ${
                        isSelected
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-text-light hover:bg-muted hover:text-text"
                      }`}
                    >
                      {option.label}

                      {isSelected && (
                        <Check size={14} className="text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyOrdersFilters;

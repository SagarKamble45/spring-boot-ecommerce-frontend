import { useEffect, useMemo, useRef, useState } from "react";

export default function useProductFilters({
  records,
  serverSide,
  onFilterChange,
  // Filters already in the URL (page refresh / back button), so the
  // dropdowns start with the right values.
  initialFilters = {},
}) {
  const [search, setSearch] = useState(initialFilters.search ?? "");
  const [categoryFilter, setCategoryFilter] = useState(
    initialFilters.category || "All",
  );
  const [statusFilter, setStatusFilter] = useState(
    initialFilters.status || "All",
  );

  // Last filters sent to the parent/backend, so the first render doesn't fire.
  const lastSent = useRef(
    JSON.stringify({
      search: (initialFilters.search ?? "").trim(),
      category: initialFilters.category ?? "",
      status: initialFilters.status ?? "",
    }),
  );

  // Server-side mode: debounce filter changes, then tell the parent.
  useEffect(() => {
    if (!serverSide) return;

    const nextFilters = {
      search: search.trim(),
      category: categoryFilter === "All" ? "" : categoryFilter,
      status: statusFilter === "All" ? "" : statusFilter,
    };

    if (JSON.stringify(nextFilters) === lastSent.current) return;

    const timeoutId = setTimeout(() => {
      lastSent.current = JSON.stringify(nextFilters);
      onFilterChange?.(nextFilters);
    }, 400);

    return () => clearTimeout(timeoutId);

    // Parent may pass an inline onFilterChange, so it's intentionally omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryFilter, statusFilter, serverSide]);

  // Client-side mode filters locally; server-side data is already filtered.
  const filtered = useMemo(() => {
    if (serverSide) return records;

    const term = search.trim().toLowerCase();

    return records.filter((product) => {
      const matchesSearch =
        !term ||
        product.id?.toString().toLowerCase().includes(term) ||
        product.name?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term);

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [records, search, categoryFilter, statusFilter, serverSide]);

  const hasFilters =
    !!search || categoryFilter !== "All" || statusFilter !== "All";

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  return {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    filtered,
    hasFilters,
    clearFilters,
  };
}
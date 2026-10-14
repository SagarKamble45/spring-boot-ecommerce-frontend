import { useEffect, useMemo, useRef, useState } from "react";

export default function useOrderFilters({
  records,
  serverSide,
  onFilterChange,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // Stores the last filters sent to the backend.
  // This prevents an unnecessary API/filter call on first render.
  const lastSent = useRef(
    JSON.stringify({
      search: "",
      status: "",
      payment: "",
    })
  );

  // In server-side mode, debounce filter changes before telling the parent.
  useEffect(() => {
    if (!serverSide) return;

    const nextFilters = {
      search: search.trim(),
      status: statusFilter === "All" ? "" : statusFilter,
      payment: paymentFilter === "All" ? "" : paymentFilter,
    };

    if (JSON.stringify(nextFilters) === lastSent.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      lastSent.current = JSON.stringify(nextFilters);
      onFilterChange?.(nextFilters);
    }, 400);

    return () => clearTimeout(timeoutId);

    // Intentionally omit onFilterChange because parent may provide an inline function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter, paymentFilter, serverSide]);

  // In client-side mode, filter records locally.
  // In server-side mode, backend has already returned filtered records.
  const filtered = useMemo(() => {
    if (serverSide) {
      return records;
    }

    const term = search.trim().toLowerCase();

    return records.filter((order) => {
      const matchesSearch =
        !term ||
        order.id?.toString().toLowerCase().includes(term) ||
        order.email?.toLowerCase().includes(term) ||
        order.UserName?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || order.PgName === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [records, search, statusFilter, paymentFilter, serverSide]);

  const hasFilters =
    !!search || statusFilter !== "All" || paymentFilter !== "All";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
  };

  return {
    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    paymentFilter,
    setPaymentFilter,

    filtered,
    hasFilters,
    clearFilters,
  };
}
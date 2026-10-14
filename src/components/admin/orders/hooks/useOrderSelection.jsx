import { useEffect, useMemo, useState } from "react";

export default function useOrderSelection({
  visibleRows,
  allRows,
  page,
}) {
  const [selected, setSelected] = useState([]);

  // Preserve your original behavior:
  // selection belongs only to the page currently being viewed.
  useEffect(() => {
    setSelected([]);
  }, [page]);

  const toggleRow = (id) => {
    setSelected((previousSelected) =>
      previousSelected.includes(id)
        ? previousSelected.filter((selectedId) => selectedId !== id)
        : [...previousSelected, id]
    );
  };

  const allFilteredSelected =
    visibleRows.length > 0 &&
    visibleRows.every((order) => selected.includes(order.id));

  const toggleAll = () => {
    if (allFilteredSelected) {
      const visibleOrderIds = new Set(
        visibleRows.map((order) => order.id)
      );

      setSelected((previousSelected) =>
        previousSelected.filter((id) => !visibleOrderIds.has(id))
      );

      return;
    }

    setSelected((previousSelected) => [
      ...new Set([
        ...previousSelected,
        ...visibleRows.map((order) => order.id),
      ]),
    ]);
  };

  const clearSelection = () => {
    setSelected([]);
  };

  // Preserve the behavior from your old CSV export:
  // export selected records from all currently loaded table records.
  const selectedRows = useMemo(
    () => allRows.filter((order) => selected.includes(order.id)),
    [allRows, selected]
  );

  return {
    selected,
    selectedRows,
    allFilteredSelected,
    toggleRow,
    toggleAll,
    clearSelection,
  };
}
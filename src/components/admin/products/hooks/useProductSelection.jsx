import { useEffect, useMemo, useState } from "react";

export default function useProductSelection({ visibleRows, allRows, page }) {
  const [selected, setSelected] = useState([]);

  // Selection belongs only to the page currently being viewed.
  useEffect(() => {
    setSelected([]);
  }, [page]);

  const toggleRow = (id) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id]
    );
  };

  const allFilteredSelected =
    visibleRows.length > 0 &&
    visibleRows.every((product) => selected.includes(product.id));

  const toggleAll = () => {
    if (allFilteredSelected) {
      const visibleIds = new Set(visibleRows.map((product) => product.id));
      setSelected((previous) => previous.filter((id) => !visibleIds.has(id)));
      return;
    }

    setSelected((previous) => [
      ...new Set([...previous, ...visibleRows.map((product) => product.id)]),
    ]);
  };

  const clearSelection = () => setSelected([]);

  const selectedRows = useMemo(
    () => allRows.filter((product) => selected.includes(product.id)),
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
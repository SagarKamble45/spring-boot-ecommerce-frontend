import { useCallback, useMemo, useState } from "react";
import { normalizeCategoryStatus } from "../components/CategoryStatusBadge";

const getCategoryId = (category) =>
  category.categoryId ?? category.id;

const getCategoryName = (category) =>
  category.categoryName ?? category.name ?? "";

const getCategoryDescription = (category) =>
  category.categoryDescription ?? category.description ?? "";

const getCategoryStatus = (category) =>
  category.categoryStatus ?? category.status;

const getProductCount = (category) =>
  Math.max(0, Number(category.productCount) || 0);

const useCategoryTable = (
  categories = [],
  pagination = {},
  onPageChange = () => {}
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedIds, setSelectedIds] = useState([]);

  // Pagination metadata comes from the backend.
  const currentPage = (pagination.pageNumber ?? 0) + 1;
  const pageSize = pagination.pageSize ?? 10;
  const totalItems = pagination.totalElements ?? categories.length;
  const totalPages = Math.max(1, pagination.totalPages ?? 1);

  // Search, filter, and sort the categories returned for the current page.
  const filteredCategories = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const result = categories.filter((category) => {
      const name = getCategoryName(category).toLowerCase();
      const description = getCategoryDescription(category).toLowerCase();
      const status = normalizeCategoryStatus(getCategoryStatus(category));

      const matchesSearch =
        name.includes(search) || description.includes(search);

      const matchesStatus =
        statusFilter === "All" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return getCategoryName(b).localeCompare(getCategoryName(a));

        case "products-desc":
          return getProductCount(b) - getProductCount(a);

        case "products-asc":
          return getProductCount(a) - getProductCount(b);

        case "status":
          return normalizeCategoryStatus(getCategoryStatus(a)).localeCompare(
            normalizeCategoryStatus(getCategoryStatus(b))
          );

        case "name-asc":
        default:
          return getCategoryName(a).localeCompare(getCategoryName(b));
      }
    });
  }, [categories, searchTerm, statusFilter, sortBy]);

  // The backend already paginates the response, so don't slice it again.
  const paginatedCategories = filteredCategories;

  const currentPageIds = paginatedCategories
    .map(getCategoryId)
    .filter((id) => id != null);

  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleStatusFilter = useCallback((value) => {
    setStatusFilter(value);
  }, []);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
  }, []);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (allCurrentPageSelected) {
      setSelectedIds((previous) =>
        previous.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      setSelectedIds((previous) => [
        ...new Set([...previous, ...currentPageIds]),
      ]);
    }
  }, [allCurrentPageSelected, currentPageIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Pagination is controlled by the parent hook, which fetches from the API.
  const goToPage = useCallback(
    (page) => {
      const safePage = Math.max(1, Math.min(page, totalPages));

      if (safePage !== currentPage) {
        onPageChange(safePage - 1);
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  return {
    searchTerm,
    statusFilter,
    sortBy,
    selectedIds,
    currentPage,
    pageSize,
    totalItems,
    filteredCategories,
    paginatedCategories,
    totalPages,
    allCurrentPageSelected,
    handleSearch,
    handleStatusFilter,
    handleSortChange,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    goToPage,
    setSelectedIds,
  };
};

export default useCategoryTable;
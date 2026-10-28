
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../../store/action";

import useCategoryFilter from "../../../../hooks/useCategoryFilter";

const useCategories = () => {
  const dispatch = useDispatch();

  // URL-driven pagination, search, status filtering, and fetching
  const {
    currentPage,
    pageNumber,
    pageSize,
    keyword,
    status,
    searchInput,
    handleSearchChange,
    handleStatusChange,
    handlePageChange,
    refresh,
  } = useCategoryFilter();

  // Modal state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Create or update a category
  const handleSaveCategory = useCallback(
    async (formData) => {
      const categoryName =
        typeof formData.categoryName === "string"
          ? formData.categoryName.trim()
          : "";

      const categoryDescription =
        formData.categoryDescription ?? formData.description ?? "";

      const categoryStatus =
        formData.categoryStatus ?? formData.status;

      if (!categoryName || categoryName.length < 5) {
        return {
          ok: false,
          error: "Category name must contain at least 5 characters.",
        };
      }

      let result;

      if (selectedCategory) {
        const categoryId =
          selectedCategory.categoryId ?? selectedCategory.id;

        if (categoryId == null) {
          return { ok: false, error: "Category ID is missing." };
        }

        const updatePayload = {
          categoryName,
          categoryDescription,
        };

        if (categoryStatus != null) {
          updatePayload.categoryStatus = categoryStatus;
        }

        result = await dispatch(
          updateCategory(categoryId, updatePayload),
        );
      } else {
        const createPayload = {
          categoryName,
          categoryDescription,
        };

        if (categoryStatus != null) {
          createPayload.categoryStatus = categoryStatus;
        }

        result = await dispatch(createCategory(createPayload));
      }

      if (result?.ok) {
        setIsFormOpen(false);
        setSelectedCategory(null);
        refresh();
      }

      return result;
    },
    [dispatch, selectedCategory, refresh],
  );

  // Delete a category
  const handleConfirmDelete = useCallback(async () => {
    const categoryId =
      selectedCategory?.categoryId ?? selectedCategory?.id;

    if (categoryId == null) {
      return { ok: false, error: "Category ID is missing." };
    }

    const result = await dispatch(deleteCategory(categoryId));

    if (result?.ok) {
      setIsDeleteOpen(false);
      setSelectedCategory(null);
      refresh();
    }

    return result;
  }, [dispatch, selectedCategory, refresh]);

  // Modal handlers
  const handleAddCategory = useCallback(() => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  }, []);

  const handleEditCategory = useCallback((category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  }, []);

  const handleDeleteCategory = useCallback((category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  }, []);

  const handleViewCategory = useCallback((category) => {
    setSelectedCategory(category);
    setIsViewOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteOpen(false);
    setSelectedCategory(null);
  }, []);

  const closeViewModal = useCallback(() => {
    setIsViewOpen(false);
    setSelectedCategory(null);
  }, []);

  return {
    // Pagination
    currentPage,
    pageNumber,
    pageSize,
    handlePageChange,

    // Search and status filters
    keyword,
    status,
    searchInput,
    handleSearchChange,
    handleStatusChange,

    // Modal state
    selectedCategory,
    isFormOpen,
    isDeleteOpen,
    isViewOpen,

    // CRUD handlers
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory,
    handleDeleteCategory,
    handleConfirmDelete,
    handleViewCategory,

    // Refresh
    handleRetry: refresh,
    refresh,

    // Modal close handlers
    closeForm,
    closeDeleteModal,
    closeViewModal,
  };
};

export default useCategories;

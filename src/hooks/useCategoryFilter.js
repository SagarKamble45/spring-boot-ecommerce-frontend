
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchCategories } from "../store/action";

const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;

/**
 * Build the backend query from URL parameters.
 *
 * URL page is 1-based.
 * Spring Boot pageNumber is 0-based.
 */
export const buildCategoryQuery = (
  searchParams,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const requestedPage = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage >= 1
      ? requestedPage
      : 1;

  const params = new URLSearchParams();

  params.set("pageNumber", String(currentPage - 1));
  params.set("pageSize", String(pageSize));

  const keyword = searchParams.get("keyword")?.trim();
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (status && status !== "All") {
    params.set("status", status.toUpperCase());
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
  }

  if (sortOrder) {
    params.set("sortOrder", sortOrder);
  }

  return params.toString();
};

const useCategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const pageSize = DEFAULT_PAGE_SIZE;

  const requestedPage = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage >= 1
      ? requestedPage
      : 1;

  // URL is the source of truth for the committed search and status filters.
  const keyword = searchParams.get("keyword") ?? "";
  const status = searchParams.get("status") ?? "All";

  // Local input lets the user type without updating the URL on every keystroke.
  const [searchInput, setSearchInput] = useState(keyword);

  // Keep the input synchronized with browser back/forward and direct URL changes.
  useEffect(() => {
    setSearchInput(keyword);
  }, [keyword]);

  // Normalize an invalid or missing page in the URL.
  useEffect(() => {
    if (searchParams.get("page") !== String(currentPage)) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(currentPage));

      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams, currentPage]);

  // Debounce search, write it to the URL, and reset pagination.
  useEffect(() => {
    const normalizedInput = searchInput.trim();

    if (normalizedInput === keyword.trim()) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);

      if (normalizedInput) {
        nextParams.set("keyword", normalizedInput);
      } else {
        nextParams.delete("keyword");
      }

      nextParams.set("page", "1");
      setSearchParams(nextParams);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchInput, keyword, searchParams, setSearchParams]);

  const queryString = useMemo(
    () => buildCategoryQuery(searchParams, pageSize),
    [searchParams, pageSize],
  );

  // Fetch from the backend whenever the committed URL query changes.
  useEffect(() => {
    dispatch(fetchCategories(queryString));
  }, [dispatch, queryString]);

  const handleSearchChange = useCallback((value) => {
    setSearchInput(value);
  }, []);

  const handleStatusChange = useCallback(
    (nextStatus) => {
      const nextParams = new URLSearchParams(searchParams);

      if (!nextStatus || nextStatus === "All") {
        nextParams.delete("status");
      } else {
        nextParams.set("status", String(nextStatus).toUpperCase());
      }

      nextParams.set("page", "1");
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  // Pagination UI uses 1-based page numbers.
  const handlePageChange = useCallback(
    (nextPage) => {
      const page = Number(nextPage);

      if (!Number.isSafeInteger(page) || page < 1) {
        return;
      }

      if (page === currentPage) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(page));

      setSearchParams(nextParams);
    },
    [currentPage, searchParams, setSearchParams],
  );

  // Re-fetch the current filtered query after a successful mutation.
  const refresh = useCallback(() => {
    return dispatch(fetchCategories(queryString));
  }, [dispatch, queryString]);

  return {
    currentPage,
    pageNumber: currentPage - 1,
    pageSize,

    keyword,
    status,
    searchInput,

    handleSearchChange,
    handleStatusChange,
    handlePageChange,

    refresh,
  };
};

export default useCategoryFilter;

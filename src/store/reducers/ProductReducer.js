const initialState = {
  // storefront
  products: [],
  categories: [],
  pagination: {},

  // admin products page (kept separate so the storefront and admin
  // never overwrite each other's pagination)
  adminProducts: [],
  adminPagination: {},
  adminProductsLoading: false,
  adminProductsError: null,
  categoryOptions: [], // every category, used by the filter + Add Product dropdowns
  productStats: {},
  recentProducts: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "ADMIN_PRODUCTS_LOADING":
      return { ...state, adminProductsLoading: true, adminProductsError: null };

    case "ADMIN_PRODUCTS_ERROR":
      return {
        ...state,
        adminProductsLoading: false,
        adminProductsError: action.payload,
      };

    case "FETCH_PRODUCTS_ADMIN":
      return {
        ...state,
        adminProducts: action.payload,
        adminProductsLoading: false,
        adminProductsError: null,
        adminPagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "FETCH_PRODUCT_STATS":
      return { ...state, productStats: action.payload };

    case "FETCH_RECENT_PRODUCTS":
      return { ...state, recentProducts: action.payload };

    // Storefront category list. NOTE: no longer touches `pagination`
    // (it used to overwrite the products pagination).
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload };

    case "FETCH_CATEGORY_OPTIONS":
      return { ...state, categoryOptions: action.payload };

    default:
      return state;
  }
};

export default ProductReducer;

const initialState = {
  // Storefront products
  products: [],
  pagination: {},

  // Admin products
  adminProducts: [],
  adminPagination: {},
  adminProductsLoading: false,
  adminProductsError: null,

  // Product statistics
  productStats: {},
  productStatsLoading: false,
  productStatsError: null,

  // Recent products
  recentProducts: [],
  recentProductsLoading: false,
  recentProductsError: null,
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------------------------------
    // Storefront products
    // ----------------------------------
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

    // ----------------------------------
    // Admin products
    // ----------------------------------
    case "ADMIN_PRODUCTS_LOADING":
      return {
        ...state,
        adminProductsLoading: true,
        adminProductsError: null,
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

    case "ADMIN_PRODUCTS_ERROR":
      return {
        ...state,
        adminProductsLoading: false,
        adminProductsError: action.payload,
      };

    // ----------------------------------
    // Product statistics
    // ----------------------------------
    case "PRODUCT_STATS_LOADING":
      return {
        ...state,
        productStatsLoading: true,
        productStatsError: null,
      };

    case "FETCH_PRODUCT_STATS":
      return {
        ...state,
        productStats: action.payload,
        productStatsLoading: false,
        productStatsError: null,
      };

    case "PRODUCT_STATS_ERROR":
      return {
        ...state,
        productStatsLoading: false,
        productStatsError: action.payload,
      };

    // ----------------------------------
    // Recent products
    // ----------------------------------
    case "RECENT_PRODUCTS_LOADING":
      return {
        ...state,
        recentProductsLoading: true,
        recentProductsError: null,
      };

    case "FETCH_RECENT_PRODUCTS":
      return {
        ...state,
        recentProducts: action.payload,
        recentProductsLoading: false,
        recentProductsError: null,
      };

    case "RECENT_PRODUCTS_ERROR":
      return {
        ...state,
        recentProductsLoading: false,
        recentProductsError: action.payload,
      };

    // ----------------------------------
    // Product deletion
    // ----------------------------------
    case "DELETING_PRODUCT": {
      const id = action.payload;

      const matches = (product) =>
        (product.productId ?? product.id) === id;

      return {
        ...state,
        adminProducts: state.adminProducts.filter(
          (product) => !matches(product)
        ),
        recentProducts: state.recentProducts.filter(
          (product) => !matches(product)
        ),
        adminPagination: {
          ...state.adminPagination,
          totalElements: Math.max(
            0,
            (state.adminPagination.totalElements ?? 1) - 1
          ),
        },
      };
    }

    default:
      return state;
  }
};

export default ProductReducer;

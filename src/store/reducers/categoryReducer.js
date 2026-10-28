const initialState = {
  // Storefront categories
  categories: [],
  pagination: {},

  // Admin categories
  adminCategories: [],
  categoryPagination: {},
  categoryLoading: false,
  categoryMutationLoading: false,
  categoryError: null,

  // Category dropdown options
  categoryOptions: [],
  categoryOptionsLoading: false,
  categoryOptionsError: null,

  // Category statistics
  categoryStats: {},
  categoryStatsLoading: false,
  categoryStatsError: null,

  // Category distribution (for the chart)
  categoryDistribution: [],
  categoryDistributionLoading: false,
  categoryDistributionError: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------------------------------
    // Storefront categories
    // ----------------------------------
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        pagination: {
          pageNumber: action.pageNumber ?? 0,
          pageSize: action.pageSize ?? action.payload.length,
          totalElements: action.totalElements ?? action.payload.length,
          totalPages: action.totalPages ?? 1,
          lastPage: action.lastPage ?? true,
        },
        categoryLoading: false,
        categoryError: null,
      };

    // ----------------------------------
    // Admin categories
    // ----------------------------------
    case "ADMIN_CATEGORIES_LOADING":
      return {
        ...state,
        categoryLoading: true,
        categoryError: null,
      };

    case "FETCH_ADMIN_CATEGORIES": {
      const response = action.payload;

      return {
        ...state,
        adminCategories: Array.isArray(response?.content)
          ? response.content
          : [],
        categoryPagination: {
          pageNumber: response?.pageNumber ?? 0,
          pageSize: response?.pageSize ?? 10,
          totalElements: response?.totalElements ?? 0,
          totalPages: response?.totalPages ?? 0,
          lastPage: response?.lastPage ?? true,
        },
        categoryLoading: false,
        categoryError: null,
      };
    }

    case "CATEGORY_LOADING":
      return {
        ...state,
        categoryLoading: true,
        categoryError: null,
      };

    case "CATEGORY_ERROR":
      return {
        ...state,
        categoryLoading: false,
        categoryError: action.payload,
      };

    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoading: false,
        categoryError: null,
      };

    case "CATEGORY_MUTATION_LOADING":
      return {
        ...state,
        categoryMutationLoading: true,
        categoryError: null,
      };

    case "CATEGORY_MUTATION_SUCCESS":
      return {
        ...state,
        categoryMutationLoading: false,
        categoryError: null,
      };

    // ----------------------------------
    // Category dropdown options
    // ----------------------------------
    case "CATEGORY_OPTIONS_LOADING":
      return {
        ...state,
        categoryOptionsLoading: true,
        categoryOptionsError: null,
      };

    case "FETCH_CATEGORY_OPTIONS":
      return {
        ...state,
        categoryOptions: action.payload,
        categoryOptionsLoading: false,
        categoryOptionsError: null,
      };

    case "CATEGORY_OPTIONS_ERROR":
      return {
        ...state,
        categoryOptionsLoading: false,
        categoryOptionsError: action.payload,
      };

    // ----------------------------------
    // Category statistics
    // ----------------------------------
    case "CATEGORY_STATS_LOADING":
      return {
        ...state,
        categoryStatsLoading: true,
        categoryStatsError: null,
      };

    case "FETCH_CATEGORY_STATS":
      return {
        ...state,
        categoryStats: action.payload,
        categoryStatsLoading: false,
        categoryStatsError: null,
      };

    case "CATEGORY_STATS_ERROR":
      return {
        ...state,
        categoryStatsLoading: false,
        categoryStatsError: action.payload,
      };

    // ----------------------------------
    // Category distribution
    // ----------------------------------
    case "CATEGORY_DISTRIBUTION_LOADING":
      return {
        ...state,
        categoryDistributionLoading: true,
        categoryDistributionError: null,
      };

    case "FETCH_CATEGORY_DISTRIBUTION":
      return {
        ...state,
        categoryDistribution: Array.isArray(action.payload)
          ? action.payload
          : [],
        categoryDistributionLoading: false,
        categoryDistributionError: null,
      };

    case "CATEGORY_DISTRIBUTION_ERROR":
      return {
        ...state,
        categoryDistributionLoading: false,
        categoryDistributionError: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;

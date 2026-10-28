
const initialState = {
  // Existing global loading state
  isLoading: false,
  errorMessage: null,

  // Existing category loading state
  categoryLoader: false,
  categoryError: null,

  // Dashboard: independent API states
  analyticsLoading: true,
  analyticsError: null,

  salesOverviewLoading: true,
  salesOverviewError: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    // Existing global loading actions.
    // Support both spellings to avoid breaking older calls.
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };

    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    // Existing category loading actions
    case "CATEGORY_LOADER":
      return {
        ...state,
        categoryLoader: true,
        categoryError: null,
      };

    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoader: false,
        categoryError: null,
      };

    case "CATEGORY_ERROR":
      return {
        ...state,
        categoryLoader: false,
        categoryError: action.payload,
      };

    // Dashboard Analytics API
    case "ANALYTICS_FETCHING":
      return {
        ...state,
        analyticsLoading: true,
        analyticsError: null,
      };

    case "ANALYTICS_SUCCESS":
      return {
        ...state,
        analyticsLoading: false,
        analyticsError: null,
      };

    case "ANALYTICS_ERROR":
      return {
        ...state,
        analyticsLoading: false,
        analyticsError: action.payload,
      };

    // Dashboard Sales Summary API
    case "SALES_OVERVIEW_FETCHING":
      return {
        ...state,
        salesOverviewLoading: true,
        salesOverviewError: null,
      };

    case "SALES_OVERVIEW_SUCCESS":
      return {
        ...state,
        salesOverviewLoading: false,
        salesOverviewError: null,
      };

    case "SALES_OVERVIEW_ERROR":
      return {
        ...state,
        salesOverviewLoading: false,
        salesOverviewError: action.payload,
      };

    default:
      return state;
  }
};

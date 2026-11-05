const initialState = {
  analytics: {},
  analyticsLoading: false,
  analyticsError: null,

  salesOverview: [],
  salesOverviewLoading: false,
  salesOverviewError: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ANALYTICS_LOADING":
      return {
        ...state,
        analyticsLoading: true,
        analyticsError: null,
      };

    case "FETCH_ANALYTICS":
      return {
        ...state,
        analytics: action.payload,
        analyticsLoading: false,
        analyticsError: null,
      };

    case "ANALYTICS_ERROR":
      return {
        ...state,
        analyticsLoading: false,
        analyticsError: action.payload,
      };

    case "SALES_OVERVIEW_LOADING":
      return {
        ...state,
        salesOverviewLoading: true,
        salesOverviewError: null,
      };

    case "FETCH_SALESDATA":
  return {
    ...state,
    salesOverview: action.payload,
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

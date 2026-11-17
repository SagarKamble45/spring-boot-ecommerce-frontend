
const initialState = {
  // Customer list
  adminCustomers: [],
  customerPagination: {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    lastPage: true,
  },
  customerLoading: false,
  customerError: null,

  // Customer statistics
  customerStats: {
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    totalOrders: 0,
  },
  customerStatsLoading: false,
  customerStatsError: null,

  // Customer details
  customerDetails: null,
  customerDetailsLoading: false,
  customerDetailsError: null,

  // Customer status update
  customerMutationLoading: false,
  customerMutationError: null,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {

    // Customer list
    case "CUSTOMERS_LOADING":
      return {
        ...state,
        customerLoading: true,
        customerError: null,
      };

    case "FETCH_ADMIN_CUSTOMERS":
      return {
        ...state,
        adminCustomers: action.payload.content || [],
        customerPagination: {
          pageNumber: action.payload.pageNumber ?? 0,
          pageSize: action.payload.pageSize ?? 10,
          totalElements: action.payload.totalElements ?? 0,
          totalPages: action.payload.totalPages ?? 0,
          lastPage: action.payload.lastPage ?? true,
        },
        customerLoading: false,
        customerError: null,
      };

    case "CUSTOMERS_ERROR":
      return {
        ...state,
        customerLoading: false,
        customerError: action.payload,
      };

    // Customer statistics
    case "CUSTOMER_STATS_LOADING":
      return {
        ...state,
        customerStatsLoading: true,
        customerStatsError: null,
      };

    case "FETCH_CUSTOMER_STATS":
      return {
        ...state,
        customerStats: action.payload,
        customerStatsLoading: false,
        customerStatsError: null,
      };

    case "CUSTOMER_STATS_ERROR":
      return {
        ...state,
        customerStatsLoading: false,
        customerStatsError: action.payload,
      };

    // Customer details
    case "CUSTOMER_DETAILS_LOADING":
      return {
        ...state,
        customerDetailsLoading: true,
        customerDetailsError: null,
      };

    case "FETCH_CUSTOMER_DETAILS":
      return {
        ...state,
        customerDetails: action.payload,
        customerDetailsLoading: false,
        customerDetailsError: null,
      };

    case "CUSTOMER_DETAILS_ERROR":
      return {
        ...state,
        customerDetailsLoading: false,
        customerDetailsError: action.payload,
      };

    case "CLEAR_CUSTOMER_DETAILS":
      return {
        ...state,
        customerDetails: null,
        customerDetailsError: null,
      };

    // Customer status mutation
    case "CUSTOMER_MUTATION_LOADING":
      return {
        ...state,
        customerMutationLoading: true,
        customerMutationError: null,
      };

    case "CUSTOMER_MUTATION_SUCCESS":
      return {
        ...state,
        customerMutationLoading: false,
        customerMutationError: null,
      };

    case "CUSTOMER_MUTATION_ERROR":
      return {
        ...state,
        customerMutationLoading: false,
        customerMutationError: action.payload,
      };

    default:
      return state;
  }
};

export default customerReducer;

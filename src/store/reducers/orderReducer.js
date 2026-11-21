
const initialState = {
  orderConfirmation: [],

  // Admin orders
  adminOrders: [],
  pagination: {},
  orderStats: {},
  recentOrders: [],

  // Customer - My Orders
  myOrders: [],
  myOrdersPagination: {},

  // Admin orders loading/error
  ordersLoading: false,
  ordersError: null,

  // Customer orders loading/error
  myOrdersLoading: false,
  myOrdersError: null,

  // Order statistics
  orderStatsLoading: false,
  orderStatsError: null,

  // Recent orders
  recentOrdersLoading: false,
  recentOrdersError: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDER_CONFIRMATION":
      return {
        ...state,
        orderConfirmation: action.payload,
      };

    // ----------------------------------
    // Admin - All Orders
    // ----------------------------------
    case "ORDERS_LOADING":
      return {
        ...state,
        ordersLoading: true,
        ordersError: null,
      };

    case "GET_ADMIN_ORDERS":
      return {
        ...state,
        adminOrders: action.payload,
        ordersLoading: false,
        ordersError: null,
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "ORDERS_ERROR":
      return {
        ...state,
        ordersLoading: false,
        ordersError: action.payload,
      };

    // ----------------------------------
    // Customer - My Orders
    // ----------------------------------
    case "MY_ORDERS_LOADING":
      return {
        ...state,
        myOrdersLoading: true,
        myOrdersError: null,
      };

    case "FETCH_MY_ORDERS":
      return {
        ...state,
        myOrders: action.payload,
        myOrdersLoading: false,
        myOrdersError: null,
        myOrdersPagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "MY_ORDERS_ERROR":
      return {
        ...state,
        myOrdersLoading: false,
        myOrdersError: action.payload,
      };

    // ----------------------------------
    // Order Statistics
    // ----------------------------------
    case "ORDER_STATS_LOADING":
      return {
        ...state,
        orderStatsLoading: true,
        orderStatsError: null,
      };

    case "FETCH_ORDER_STATS":
      return {
        ...state,
        orderStats: action.payload,
        orderStatsLoading: false,
        orderStatsError: null,
      };

    case "ORDER_STATS_ERROR":
      return {
        ...state,
        orderStatsLoading: false,
        orderStatsError: action.payload,
      };

    // ----------------------------------
    // Recent Orders
    // ----------------------------------
    case "RECENT_ORDERS_LOADING":
      return {
        ...state,
        recentOrdersLoading: true,
        recentOrdersError: null,
      };

    case "FETCH_RECENT_ORDERS":
      return {
        ...state,
        recentOrders: action.payload,
        recentOrdersLoading: false,
        recentOrdersError: null,
      };

    case "RECENT_ORDERS_ERROR":
      return {
        ...state,
        recentOrdersLoading: false,
        recentOrdersError: action.payload,
      };

    default:
      return state;
  }
};

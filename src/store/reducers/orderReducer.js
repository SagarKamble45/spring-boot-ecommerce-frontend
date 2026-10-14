const initialState = {
  orderConfirmation: [],
  adminOrders:[],
  pagination:{},
  orderStats:{},
  recentOrders:[]
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDER_CONFIRMATION":
      return {
        ...state,
        orderConfirmation: action.payload,
      };

      case "GET_ADMIN_ORDERS":
      return {
        ...state,
        adminOrders: action.payload,
        pagination:{
          pageNumber:action.pageNumber,
          pageSize:action.pageSize,
          totalElements:action.totalElements,
          totalPages:action.totalPages,
          lastPage:action.lastPage,
        }
      };

      case "FETCH_ORDER_STATS":
      return {
        ...state,
        orderStats: action.payload,
      };

      case "FETCH_RECENT_ORDERS":
        return {
          ...state,
          recentOrders:action.payload,
        }

    default:
      return state;
  }
};

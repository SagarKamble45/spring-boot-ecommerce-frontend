const initialState = {
  orderConfirmation: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDER_CONFIRMATION":
      return {
        ...state,
        orderConfirmation: action.payload,
      };

    default:
      return state;
  }
};

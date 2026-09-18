import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;
  
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  auth: {user: user},
  carts: { cart: cartItems },
};

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
  },
  preloadedState: initialState,
});

export default store;

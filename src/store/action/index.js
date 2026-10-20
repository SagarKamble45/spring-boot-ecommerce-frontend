import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);

    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
    });
    dispatch({ type: "CATEGORY_SUCCESS" }); // was IS_ERROR by mistake
  } catch (error) {
    console.log(error);

    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Failed to fetch categories",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    // Find the product
    // console.log(getState());

    const { products } = getState().products;

    const getProduct = products.find(
      (item) => item.productId === data.productId,
    );

    // Check for stocks
    const isQuantityExist = getProduct.quantity >= qty;
    // console.log(product.quantity);
    // If in Stock --> add
    if (isQuantityExist) {
      dispatch({
        type: "ADD_CART",
        payload: {
          ...data,
          quantity: qty, // Cart quantity
          stock: data.quantity - 1, // Stock Quantity
        },
      });
      // console.log("Adding to cart:", data);
      toast.success(`${data.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      // error
      toast.error(`${data.productName} out of stock`);
    }
    // If not ---> error
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const stockExist = data.quantity < data.stock - 1;
    console.log(stockExist);

    // const isQuantityExist = getProduct.quantity >= currentQuantity+1;

    if (stockExist) {
      const newQuantity = currentQuantity + 1;
      // const newStock = ;
      // console.log("remaining stock",newStock);

      setCurrentQuantity(newQuantity);

      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity, stock: data.stock - 1 },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity Reached to Limit");
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity, stock: data.stock + 1 },
    });
    // console.log("Decrease Quantity", newQuantity);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });
  toast.success(`${data.productName} removed from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      console.log(sendData);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      console.log(sendData);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User Registerd Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error",
      );
    } finally {
      setLoader(false);
    }
  };

export const logOutUser = (navigate, toast) => async (dispatch) => {
  try {
    const { data } = await api.post("/auth/signout");

    localStorage.removeItem("auth");

    dispatch({
      type: "LOG_OUT",
    });

    toast.success(data?.message || "Signed out successfully");

    navigate("/logout");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to sign out");
  }
};

export const addUpdateUserAddress =
  (newAddress, toast) => async (dispatch, getState) => {
    const { user } = getState().auth;

    dispatch({ type: "ADD_ADDRESS" });

    try {
      // if the address already has an addressId, it exists in the DB -> update it
      // otherwise it's a brand new address -> create it
      if (newAddress.addressId) {
        await api.put(`addresses/${newAddress.addressId}`, newAddress);
        toast.success("Address updated successfully");
      } else {
        await api.post("addresses", newAddress);
        toast.success("Address saved successfully");
      }

      // refresh the address list from the server so the UI reflects
      // the latest data without needing a manual page reload
      dispatch(getUserAddresses());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/users/addresses");
    // console.log(data)
    dispatch({ type: "USER_ADDRESS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Failed to fetch user address",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    // console.log(data)
    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Failed to create cart Items",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/users/cart");
    // console.log(data)
    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Failed to create cart Items",
    });
  }
};

export const createRazorpayCheckoutOrder = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: "RAZORPAY_PAYMENT_START" });

    // Creates internal PENDING order
    const { data: internalOrder } = await api.post("/orders", {
      addressId,
    });

    // Creates Razorpay Test Mode order
    const { data: razorpayOrder } = await api.post("/payments/razorpay/order", {
      orderId: internalOrder.orderId,
    });

    dispatch({
      type: "RAZORPAY_ORDER_CREATED",
      payload: {
        internalOrder,
        razorpayOrder,
      },
    });

    // A thunk can return data to Checkout.jsx
    return { internalOrder, razorpayOrder };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to start payment";

    dispatch({
      type: "RAZORPAY_PAYMENT_ERROR",
      payload: message,
    });

    throw new Error(message);
  }
};

export const verifyRazorpayPayment = (paymentData) => async (dispatch) => {
  try {
    const { data } = await api.post("/payments/razorpay/verify", paymentData);

    dispatch({
      type: "RAZORPAY_PAYMENT_VERIFIED",
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Payment verification failed";

    dispatch({
      type: "RAZORPAY_PAYMENT_ERROR",
      payload: message,
    });

    throw new Error(message);
  }
};

export const createStripePaymentSecret =
  (sendData) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.post(
        "/payments/stripe/client-secret",
        sendData,
      );
      dispatch({ type: "CLIENT_SECRET", payload: data });
      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to create client secret",
      );
    }
  };

export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.post("/order/users/payments/online", sendData);
      console.log("API RESPONSE:", response.data);
      localStorage.removeItem("CHECKOUT_ADDRESS");
      if (response.data.payment.pgStatus === "succeeded") {
        dispatch({ type: "SET_ORDER_CONFIRMATION", payload: response.data });
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted");
      } else {
        setErrorMessage("Not able to make api call ");
      }
    } catch (error) {
      console.error("STRIPE CONFIRMATION ERROR:", error);
      setErrorMessage("Payment Failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

export const analyticsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/admin/app/analytics");
    dispatch({
      type: "FETCH_ANALYTICS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};

export const getSalesOverview = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/admin/app/sales_summary");
    dispatch({
      type: "FETCH_SALESDATA",
      payload: data,
    });
    console.log(data);
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch Sales data",
    });
  }
};

export const getOrdersForDashboard =
  (queryString = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(
        `/admin/orders${queryString ? `?${queryString}` : ""}`,
      );

      dispatch({
        type: "GET_ADMIN_ORDERS",
        payload: data.content,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        lastPage: data.lastPage,
      });
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data ||
          error?.message ||
          "Failed to fetch Orders data",
      });
    }
  };

export const updateOrderStatus =
  (orderId, orderStatus, queryString = "", toast, setLoader) =>
  async (dispatch) => {
    console.log("Query: ", queryString);
    try {
      setLoader(true);

      const { data } = await api.put(`/admin/orders/${orderId}/status`, {
        status: orderStatus,
      });

      toast.success(data.message || "Order updated successfully");

      // Refresh orders and analytics with the same filters/page
      await dispatch(getOrdersForDashboard(queryString));
      await dispatch(fetchOrderStats());

      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return error;
    } finally {
      setLoader(false);
    }
  };

export const fetchOrderStats = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/admin/orderStats");

    dispatch({
      type: "FETCH_ORDER_STATS",
      payload: {
        TotalRevenue: Number(data.TotalRevenue) || 0,
        totalOrders: Number(data.totalOrders) || 0,
        deliveredOrders: Number(data.totalDelivered) || 0,
        processedOrders: Number(data.totalProcessed) || 0,
        cancelledOrders: Number(data.cancelledOrders) || 0,
        pendingOrders: Number(data.pendingOrders) || 0,
        shippedOrders: Number(data.shippedOrders) || 0,
      },
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};

export const fetchRecentOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/admin/orders/recent");

    dispatch({
      type: "FETCH_RECENT_ORDERS",
      payload: data,
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};


export const fetchProductsforAdmin = (queryString) => async (dispatch) => {
  try {
    // Own loading flag: three admin calls run at once, and the shared
    // IS_FETCHING / IS_SUCCESS flag can't tell them apart.
    dispatch({ type: "ADMIN_PRODUCTS_LOADING" });
    const { data } = await api.get(`/admin/products?${queryString}`);

    dispatch({
      type: "FETCH_PRODUCTS_ADMIN",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "ADMIN_PRODUCTS_ERROR",
      payload:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (typeof error?.response?.data === "string" && error.response.data) ||
        error?.message ||
        "Failed to fetch products for Admin dashboard",
    });
  }
};

// Every category for dropdowns (admin filter + Add Product form).
// Stored in `categoryOptions`, so it never touches pagination.
export const fetchCategoryOptions = () => async (dispatch) => {
  try {
    // pageSize is large on purpose: a dropdown needs ALL categories.
    const { data } = await api.get(
      "/public/categories?pageNumber=0&pageSize=200",
    );
    dispatch({ type: "FETCH_CATEGORY_OPTIONS", payload: data.content ?? [] });
  } catch (error) {
    console.log(error);
  }
};

// Create a product, then (optionally) upload its image.
// >>> Match these two URLs to your Spring Boot controller. <<<
export const addNewProduct =
  ({ categoryId, product, imageFile }, toast, setLoader) =>
  async () => {
    try {
      setLoader(true);

      const { data: created } = await api.post(
        `/admin/categories/${categoryId}/product`,
        product,
      );

      let result = created;
      console.log("result:", result)

      if (imageFile) {
        try {
          const form = new FormData();
          form.append("image", imageFile);
          console.log("in the Create product field", imageFile);
          const { data: withImage } = await api.put(
            `/admin/products/${created.productId}/image`,
            form,
          );
          result = withImage;
        } catch (imageError) {
          console.log(imageError);
          toast.error("Product saved, but the image upload failed");
        }
      }

      toast.success("Product added successfully");
      return { ok: true, data: result };
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          (typeof error?.response?.data === "string" && error.response.data) ||
          "Failed to add product",
      );
      return { ok: false };
    } finally {
      setLoader(false);
    }
  };

export const fetchProductStats = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/admin/productStats");

    dispatch({
      type: "FETCH_PRODUCT_STATS",
      payload: {
        totalActiveProducts: Number(data.totalActiveProducts) || 0,
        totalCategories: Number(data.totalCategories) || 0,
        totalOutOfStockProducts: Number(data.totalOutOfStockProducts) || 0,
        totalProducts: Number(data.totalProducts) || 0,
      },
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};

export const fetchRecentProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/admin/products/recent");

    dispatch({
      type: "FETCH_RECENT_PRODUCTS",
      payload: data,
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};

// Update a product, then (optionally) replace its image.
// >>> Match these two URLs to your Spring Boot controller. <<<
export const updateProduct =
  ({ productId, categoryId, product, imageFile }, toast, setLoader) =>
  async () => {
    try {
      setLoader(true);
 
      const { data: updated } = await api.put(
        `/admin/products/${productId}?categoryId=${categoryId}`,
        product,
      );
 
      let result = updated;
 
      if (imageFile) {
        try {
          const form = new FormData();
          form.append("image", imageFile);

          console.log("in the update product field", imageFile);
          const { data: withImage } = await api.put(
            `/admin/products/${productId}/image`,
            form,
          );
          result = withImage;
        } catch (imageError) {
          console.log(imageError);
          toast.error("Product updated, but the image upload failed");
        }
      }
 
      toast.success("Product updated successfully");
      return { ok: true, data: result };
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          (typeof error?.response?.data === "string" && error.response.data) ||
          "Failed to update product",
      );
      return { ok: false };
    } finally {
      setLoader(false);
    }
  };
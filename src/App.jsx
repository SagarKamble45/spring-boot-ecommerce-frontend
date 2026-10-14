import "./App.css";
import Home from "./components/home/Home";
import Products from "./components/products/Products";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
// import Checkout from "./components/checkout/Checkout";
import Checkout from "./components/checkout/checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminProducts from "./components/admin/products/AdminProducts";
import Categories from "./components/admin/categories/Categories";
import Sellers from "./components/admin/sellers/Sellers";
import Orders from "./components/admin/orders/Orders";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<PaymentConfirmation />} />
            <Route path="/orders" element={<PaymentConfirmation />} />
          </Route>

          <Route path="/logout" element={<Logout />} />

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<PrivateRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<Categories />} />
              <Route path="sellers" element={<Sellers />} />
            </Route>
          </Route>
        </Routes>
      </Router>

      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;

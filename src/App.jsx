
import "./App.css";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// Shared components
import Navbar from "./components/shared/Navbar";

// Customer pages
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/cart/Cart";

// Authentication
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";

// Checkout
import Checkout from "./components/checkout/checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminProducts from "./components/admin/products/AdminProducts";
import Categories from "./components/admin/categories/Categories";
import Sellers from "./components/admin/sellers/Sellers";
import Orders from "./components/admin/orders/Orders";
import ForbiddenPage from "./components/error/ForbiddenPage";
import ServerErrorPage from "./components/error/ServerErrorPage";
import NotFoundPage from "./components/error/NotFoundPage";
import Customers from "./components/admin/customers/Customers";

// Error pages


function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          {/* Authentication routes */}
          <Route element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/logout" element={<Logout />} />

          {/* Authenticated user routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/order-success"
              element={<PaymentConfirmation />}
            />
            <Route
              path="/orders"
              element={<PaymentConfirmation />}
            />
          </Route>

          {/* Admin routes */}
          <Route element={<PrivateRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<Categories />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="customers" element={<Customers />} />
            </Route>
          </Route>

          {/* Error routes */}
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/500" element={<ServerErrorPage />} />

          {/* Catch-all route - must remain last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;

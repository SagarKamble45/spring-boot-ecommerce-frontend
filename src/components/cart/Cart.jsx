import React from "react";
import { MdArrowBack, MdShoppingCart, MdSecurity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import ItemContent from "./ItemContent";
import SetQuantity from "./SetQuantity";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../utils/priceFormat";
import EmptyCart from "./EmptyCart";
import toast from "react-hot-toast";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  // console.log(cart)

  const isCartEmpty = !cart || cart.length === 0;

  const totalPrice = isCartEmpty
    ? 0
    : cart.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity),
        0,
      );
  const gst = (totalPrice * 18) / 100;
  const grandTotal = totalPrice + gst;

const handleCheckout = () => {
  if (!user) {
    toast.error("Please login to proceed with checkout.");
    navigate("/login");
    return;
  }
  navigate("/checkout");
};

  if (isCartEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <MdShoppingCart className="text-blue-600" size={32} />
        </div>

        <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>

        <p className="text-gray-500 mt-2">
          Review your selected products before checkout
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 bg-gray-50 px-6 py-4 font-semibold text-slate-700">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Total</div>
            </div>

            {/* Product Row */}
            <div>
              {cart.map((item, i) => (
                <ItemContent key={item?.productId ?? i} {...item} formatPrice={formatPrice} />
              ))}
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            <MdArrowBack />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">GST - 18%</span>
                <span>{formatPrice(gst)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition cursor-pointer"
            >
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <MdSecurity />
              Secure Payment & Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
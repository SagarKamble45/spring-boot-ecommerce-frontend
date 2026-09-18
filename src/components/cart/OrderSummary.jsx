import React from "react";
import { Link } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import formatPrice from "./../../utils/priceFormat"

const OrderSummary = ({ newCart }) => {
  const gstAmount = newCart.totalPrice * 0.18;
  const totalAmount = newCart.totalPrice + gstAmount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {formatPrice(newCart.totalPrice)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">GST (18%)</span>
          <span>{formatPrice(gstAmount)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-blue-600">
            {formatPrice(totalAmount)}
          </span>
        </div>
      </div>

      <Link to="/checkout">
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition cursor-pointer">
          Proceed to Checkout
        </button>
      </Link>

      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
        <MdSecurity />
        Secure Payment & Checkout
      </div>
    </div>
  );
};

export default OrderSummary;
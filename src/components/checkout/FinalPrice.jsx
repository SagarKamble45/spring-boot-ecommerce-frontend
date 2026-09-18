import React from "react";
import { Link } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import formatPrice from "./../../utils/priceFormat"

const FinalPrice = ({ newCart }) => {

  const totalPrice = newCart?.reduce(
  (acc, cur) => acc + Number(cur.specialPrice) * Number(cur.quantity),
  0
);

const gstAmount = totalPrice * 0.18;
const totalAmount = totalPrice + gstAmount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {formatPrice(totalPrice)}
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
    </div>
  );
};

export default FinalPrice;
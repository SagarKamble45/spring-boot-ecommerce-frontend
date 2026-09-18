import React, { useState } from "react";
import {
  MdLocationOn,
  MdEdit,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdLocalShipping,
  MdCheckCircle,
  MdLockOutline,
} from "react-icons/md";
import PaymentForm from "./PaymentForm";
import StripePayment from "./StripePayment";

const PAYMENT_LABELS = {
  card: "Credit / Debit Card",
  upi: "UPI",
  cod: "Cash on Delivery",
};

function maskCard(cardNumber = "") {
  const digits = cardNumber.replace(/\s+/g, "");
  if (digits.length < 4) return "•••• •••• •••• ••••";
  return `•••• •••• •••• ${digits.slice(-4)}`;
}

/**
 * Final review step of the checkout wizard.
 *
 * Props:
 * - shipping: the selected address object, same shape as Address.jsx's form:
 *     { fullName, phone, pincode, address, city, state, country }
 * - paymentMethod: "card" | "upi" | "cod"
 * - cardDetails: { cardNumber, ... } (only relevant when paymentMethod === "card")
 * - cart: line items, same shape used by OrderSummary
 * - total: final payable amount
 * - onPlaceOrder: async () => void — called when the person confirms the order
 * - onEditAddress / onEditPayment: () => void — jump back to an earlier step
 */
function PlaceOrder({
  shipping,
  paymentMethod,
  cart = [],
  total,
  cardDetails,
  onPlaceOrder,
  onEditAddress,
  onEditPayment,
}) {
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState("");


  const handlePlaceOrder = () =>{
    <StripePayment />
  }
  

  // Defined locally (rather than wiring the onEditAddress/onEditPayment
  // props straight into onClick) so this component owns the click
  // behaviour end-to-end — optional chaining means nothing breaks even if
  // a parent forgets to pass one of these down.
  const handleEditAddress = () => {
   
    onEditAddress?.();
  };

  const handleEditPayment = () => {

    onEditPayment?.();
  };

  return (
    <div className="space-y-5">
      {/* Delivery address */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MdLocationOn size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">Deliver to</p>
              {shipping ? (
                <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                  <p className="font-medium text-slate-800">{shipping.fullName}</p>
                  <p>
                    {shipping.address}, {shipping.city}, {shipping.state} -{" "}
                    {shipping.pincode}
                  </p>
                  {shipping.country && <p>{shipping.country}</p>}
                  {shipping.phone && <p>Phone: {shipping.phone}</p>}
                </div>
              ) : (
                <p className="text-sm text-red-500 mt-1">No address selected</p>
              )}
            </div>
          </div>
          <button
          type="button"
            onClick={handleEditAddress}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer shrink-0"
          >
            <MdEdit size={16} />
            Change
          </button>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              {paymentMethod === "card" ? (
                <MdCreditCard size={18} />
              ) : (
                <MdAccountBalanceWallet size={18} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Payment method</p>
              <p className="text-sm text-gray-600 mt-1">
                {PAYMENT_LABELS[paymentMethod] || "Not selected"}
              </p>
              {paymentMethod === "card" && cardDetails?.cardNumber && (
                <p className="text-sm text-gray-500 mt-0.5 tracking-wide">
                  {maskCard(cardDetails.cardNumber)}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={()=>{
              handleEditPayment()
            }
            }
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer shrink-0"
          >
            <MdEdit size={16} />
            Change
          </button>
        </div>
      </div>

      {/* Items being ordered
      {cart.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MdLocalShipping size={18} className="text-blue-600" />
            <p className="text-sm font-semibold text-slate-900">
              {cart.length} {cart.length === 1 ? "item" : "items"} in this order
            </p>
          </div>
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => (
              <li
                key={item.productId || item.id}
                className="py-2.5 flex items-center justify-between text-sm gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.productName || item.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-slate-800 font-medium truncate">
                      {item.productName || item.title}
                    </p>
                    <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-slate-900 font-semibold shrink-0">
                  ₹
                  {(Number(item.specialPrice) * Number(item.quantity)).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Security / terms note */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <MdLockOutline className="text-blue-600 mt-0.5 shrink-0" size={18} />
        <p className="text-xs text-gray-600 leading-relaxed">
          Your payment information is encrypted and processed securely. By placing
          this order, you agree to our{" "}
          <span className="text-blue-600 font-medium cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-600 font-medium cursor-pointer">
            Refund Policy
          </span>
          .
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Place order */}
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacing || !shipping}
        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3.5 font-semibold transition cursor-pointer"
      >
        {isPlacing ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Placing order...
          </>
        ) : (
          <>
            <MdCheckCircle size={20} />
            Place Order · ₹{Number(total).toLocaleString("en-IN")}
          </>
        )}
      </button>
    </div>
  );
}

export default PlaceOrder;
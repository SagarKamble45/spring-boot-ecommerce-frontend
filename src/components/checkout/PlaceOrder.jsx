import React, { useState } from "react";
import {
  MdLocationOn,
  MdEdit,
  MdCheckCircle,
  MdLockOutline,
} from "react-icons/md";
import StripePayment from "./StripePayment";
import { useSelector } from "react-redux";
import { getPaymentInfo } from "../../utils/paymentMethodFormatter";

function PlaceOrder({
  shipping,
  cart = [],
  total,
  onPlaceOrder,
  onEditAddress,
  onEditPayment,
}) {
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState("");
  const { paymentMethod } = useSelector((state) => state.payment);

  // Fetch payment metadata using utility function
  const activePayment = getPaymentInfo(paymentMethod);
  const PaymentIcon = activePayment.icon;

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    setError("");
    try {
      await onPlaceOrder?.();
    } catch (err) {
      setError(err?.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Delivery address */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MdLocationOn size={20} />
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
            onClick={onEditAddress}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer shrink-0 transition-colors"
          >
            <MdEdit size={16} />
            Change
          </button>
        </div>
      </div>

      {/* Payment Method Container */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Payment Summary Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <PaymentIcon size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-slate-900">
                  {activePayment.label}
                </p>
                {activePayment.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {activePayment.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {activePayment.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEditPayment}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer shrink-0 transition-colors"
          >
            <MdEdit size={16} />
            Change
          </button>
        </div>

        {/* Embedded Stripe Payment Form */}
        {paymentMethod === "stripe" && (
          <div className="pt-4 border-t border-gray-100">
            <StripePayment total={total} />
          </div>
        )}
      </div>

      {/* Security / terms note */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <MdLockOutline className="text-blue-600 mt-0.5 shrink-0" size={18} />
        <p className="text-xs text-gray-600 leading-relaxed">
          Your payment information is encrypted and processed securely. By placing
          this order, you agree to our{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
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

      {/* Standard Place Order Button for non-Stripe methods */}
      {paymentMethod !== "stripe" && (
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacing || !shipping}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3.5 font-semibold transition cursor-pointer shadow-xs"
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
      )}
    </div>
  );
}

export default PlaceOrder;
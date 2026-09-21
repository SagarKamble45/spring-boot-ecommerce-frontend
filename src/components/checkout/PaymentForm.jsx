import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { MdLockOutline, MdCheckCircle } from "react-icons/md";
import Spinner from "../Spinner";

function PaymentForm({ clientSecret, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = !clientSecret || !stripe || !elements;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // setLoading(true);
    // setErrorMessage("");

    const {error:submitError} = await elements.submit();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      return false;
    }
  };

  
  const paymentElementOptions = {
  layout: {
    type: 'tabs',
  },
  wallets: {
    applePay: 'auto',
    googlePay: 'auto'
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm font-semibold text-slate-900">
          Payment Information
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Spinner />
          <p className="text-xs text-gray-500 font-medium animate-pulse">
            Processing payment securely...
          </p>
        </div>
      ) : (
        <>
          {clientSecret && (
            <div className="stripe-element-container min-h-[150px]">
              <PaymentElement options={paymentElementOptions} />
            </div>
          )}

          {errorMessage && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3.5 font-semibold transition cursor-pointer shadow-xs mt-2"
          >
            <MdCheckCircle size={20} />
            Pay ₹{Number(totalPrice).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </button>
        </>
      )}
    </form>
  );
}

export default PaymentForm;
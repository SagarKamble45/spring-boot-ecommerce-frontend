import React, { useEffect } from "react";
import { MdCreditCard, MdLocalShipping, MdPayments } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/action/index.js";

// List of payment options.
// "card" (Stripe) and "razorpay" are active. The rest are marked "pending"
// so they show up in the UI but cannot be selected yet.
const PAYMENT_OPTIONS = [
  {
    id: "card",
    name: "Pay with Card",
    subtitle: "Powered by Stripe",
    icon: MdCreditCard,
    pending: false,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    subtitle: " Razorpay quick, easy, and secure way to pay online",
    icon: MdPayments,
    pending: false,
  },
  {
    id: "cashfree",
    name: "Cashfree",
    subtitle: "Coming soon",
    icon: MdPayments,
    pending: true,
  },
  {
    id: "payu",
    name: "PayU",
    subtitle: "Coming soon",
    icon: MdPayments,
    pending: true,
  },
  {
    id: "instamojo",
    name: "Instamojo",
    subtitle: "Coming soon",
    icon: MdPayments,
    pending: true,
  },
  {
    id: "phonepe",
    name: "PhonePe",
    subtitle: "Coming soon",
    icon: MdPayments,
    pending: true,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    subtitle: "Coming soon",
    icon: MdLocalShipping,
    pending: true,
  },
];

function Payment() {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const onSelectMethod = (method) => {
    dispatch(addPaymentMethod(method));
  };

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cartId]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <h2 className="text-xl font-bold text-slate-900">Payment</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">
        Select a payment option to continue
      </p>

      {/* List of payment options */}
      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = paymentMethod === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={option.pending}
              onClick={() => onSelectMethod(option.id)}
              className={
                "w-full flex items-center gap-4 rounded-xl border p-4 text-left transition " +
                (option.pending
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                  : isSelected
                  ? "border-indigo-600 bg-indigo-50 cursor-pointer"
                  : "border-gray-200 hover:border-gray-300 cursor-pointer")
              }
            >
              {/* Icon */}
              <div
                className={
                  "w-10 h-10 rounded-full flex items-center justify-center text-xl " +
                  (isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500")
                }
              >
                <Icon />
              </div>

              {/* Name + subtitle */}
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{option.name}</p>
                <p className="text-xs text-gray-500">{option.subtitle}</p>
              </div>

              {/* Selected checkmark / Pending tag */}
              {option.pending ? (
                <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                  Pending
                </span>
              ) : (
                <div
                  className={
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center " +
                    (isSelected ? "border-indigo-600" : "border-gray-300")
                  }
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Payment;
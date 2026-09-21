import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import EmptyCart from "../cart/EmptyCart";
import OrderSummary from "./OrderSummary";
import Address from "./Address";
import Payment from "./Payment";
import PlaceOrder from "./PlaceOrder";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { selectUserCheckoutAddress } from "../../store/action";

// 0-indexed to match MUI's `activeStep` convention directly
const STEP_ADDRESS = 0;
const STEP_PAYMENT = 1;
const STEP_CONFIRM = 2;

function Checkout() {
  const dispatch = useDispatch();
  // Cart comes straight from the Redux store, same as Cart.jsx
  const { cart } = useSelector((state) => state.carts);

  // Payment.jsx owns this slice end-to-end (payment method + card details),
  // Checkout just reads it so it can hand a snapshot to PlaceOrder.
  

  // --- Wizard step ---
  const [step, setStep] = useState(0);

  const STEPS = ["Address", "Payment", "Confirm"];

  // --- Shipping address ---
  // Address.jsx owns the "add new address" form and the list of saved
  // addresses; all Checkout needs is *which one* is currently selected.
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    dispatch(selectUserCheckoutAddress(selectedAddress));
  };


  
  if (!cart || cart.length === 0) {
    return <EmptyCart />;
  }

  // --- Total: still needed for handlePlaceOrder + PlaceOrder step; OrderSummary computes its own via FinalPrice ---
  const subtotal = cart.reduce(
    (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity),
    0,
  );
  const gst = (subtotal * 18) / 100;
  const total = subtotal + gst;

  // // --- Step validation: keep it light, just require the basics before moving on ---
  const isAddressValid = Boolean(selectedAddress);

  // // Only "card" (Stripe) is active right now, so that's all we validate.
  // // When UPI / COD go live, add their checks back in here.
  const isPaymentValid = true;

  const goNext = () => setStep((s) => Math.min(s + 1, STEP_CONFIRM));
  const goBack = () => setStep((s) => Math.max(s - 1, STEP_ADDRESS));

  const handlePlaceOrder = () => {
    // TODO: wire this up to your order-creation API / redux action
    console.log("Placing order", {
      shipping: selectedAddress,
      cart,
      total,
    });
  };

  return (

    
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Checkout</h1>
        <p className="text-gray-500 mt-2">
          Fill in your details to complete the order securely
        </p>
      </div>

      <Stepper
        activeStep={step}
        sx={{ maxWidth: 480, mx: "auto", mb: 5 }}
        alternativeLabel
      >
        {STEPS.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {console.log("current step:", step)}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Order Summary — stays visible across every step */}
        <div>
          <OrderSummary cart={cart} />
        </div>

        {/* Right: current step */}
        <div className="lg:col-span-2 space-y-6">
          {step === STEP_ADDRESS && (
            <Address
              selectedAddress={selectedAddress}
              handleSelectAddress={handleSelectAddress}
            />
          )}

          {/* Payment.jsx reads/writes payment method + card details from Redux itself, so no props needed here */}
          {step === STEP_PAYMENT && <Payment />}

          {step === STEP_CONFIRM && (
            <PlaceOrder
              shipping={selectedAddress}
              cart={cart}
              total={total}
              onPlaceOrder={handlePlaceOrder}
              onEditAddress={() => setStep(STEP_ADDRESS)}
              onEditPayment={() => setStep(STEP_PAYMENT)}
            />
          )}

          {/* Wizard navigation */}
          <div className="flex items-center justify-between pt-2">
            {step > STEP_ADDRESS ? (
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                <MdArrowBack />
                Back
              </button>
            ) : (
              <span />
            )}

            {step < STEP_CONFIRM && (
              <button
                onClick={goNext}
                disabled={
                  (step === STEP_ADDRESS && !isAddressValid) ||
                  (step === STEP_PAYMENT && !isPaymentValid)
                }
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-2.5 font-semibold transition cursor-pointer"
              >
                Continue
                <MdArrowForward />
              </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

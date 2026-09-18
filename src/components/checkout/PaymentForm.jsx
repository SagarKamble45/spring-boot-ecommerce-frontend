import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Spinner from "../Spinner";
function PaymentForm({ clientSecret, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {};

  const paymentElementOptions = {
    layout:"tabs"
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Information</h2>
      {loading ? <Spinner /> : <>{clientSecret && <PaymentElement options={paymentElementOptions}/>}
                                {errorMessage && (
                                    <div>{errorMessage}</div>
                                )}
                                <button 
                                disabled={ !stripe || loading}>
                                    {!loading ? `Pay Rs${Number(totalPrice).toFixed(2)}` : "Processing"}
                                </button>
                                </>}
    </form>
  );
}

export default PaymentForm;

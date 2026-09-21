import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom'
import Spinner from '../Spinner';
import { stripePaymentConfirmation } from '../../store/action';
import toast from 'react-hot-toast';
import { MdCheckCircle, MdContentCopy, MdErrorOutline } from 'react-icons/md';

function PaymentConfirmation() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const { orderConfirmation } = useSelector((state) => state.order);
    const [errorMessage, setErrorMeesage] = useState("");
    const [loading, setLoading] = useState(false);
     const [copied, setCopied] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    useEffect(() => {
    if (paymentIntent && clientSecret && redirectStatus && cart?.length > 0) {
        if (redirectStatus === "failed") {
            setErrorMeesage("Payment was declined. Please try a different card.");
            return; // don't call confirmation as a success
        }
        const sendData = {
            addressId: selectedUserCheckoutAddress.addressId,
            pgName: "Stripe",
            pgPaymentId: paymentIntent,
            pgStatus: redirectStatus === "succeeded" ? "succeeded" : "failed",
            pgResponseMessage: redirectStatus,
        }
        dispatch(stripePaymentConfirmation(sendData, setErrorMeesage, setLoading, toast))
    }
}, [paymentIntent, clientSecret, redirectStatus, cart])

        const getImageUrl = (imageName) => {
        if (!imageName) return "https://placehold.co/56x56?text=No+Image";
        return `${import.meta.env.VITE_BACK_END_URL}/images/${imageName}`;
    }


    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {loading ? (
                    <div className="flex flex-col items-center gap-3 py-6">
                        <Spinner />
                        <p className="text-sm text-gray-500 font-medium animate-pulse">
                            Confirming your payment...
                        </p>
                    </div>
                ) : errorMessage ? (
                    <div className="flex flex-col items-center gap-3 text-center">
                        <MdErrorOutline size={56} className="text-red-500" />
                        <h2 className="text-lg font-semibold text-slate-900">Payment Failed</h2>
                        <p className="text-sm text-gray-500">{errorMessage}</p>
                        <Link
                            to="/checkout"
                            className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition"
                        >
                            Try Again
                        </Link>
                    </div>
                ) : orderConfirmation ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <MdCheckCircle size={48} className="text-green-500" />
                            <h2 className="text-lg font-semibold text-slate-900">
                                {orderConfirmation.orderStatus}
                            </h2>
                            <p className="text-xs text-gray-400">
                                Order #{orderConfirmation.orderId} · {orderConfirmation.orderDate}
                            </p>
                        </div>

                        {/* Simple status stepper */}
                        <div className="flex items-center justify-between px-2">
                            {["Placed", "Processing", "Shipped", "Delivered"].map((step, idx) => (
                                <div key={step} className="flex-1 flex flex-col items-center relative">
                                    <div
                                        className={`w-3 h-3 rounded-full z-10 ${idx === 0 ? "bg-blue-600" : "bg-gray-200"
                                            }`}
                                    />
                                    <span className={`text-[10px] mt-1 ${idx === 0 ? "text-blue-600 font-medium" : "text-gray-400"}`}>
                                        {step}
                                    </span>
                                    {idx < 3 && (
                                        <div className="absolute top-1.5 left-1/2 w-full h-[2px] bg-gray-200 -z-0" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-3">
                            {orderConfirmation.orderItems?.map((item) => (
                                <div key={item.orderItemId} className="flex items-center gap-3">
                                    <img
                                        src={getImageUrl(item.product?.image)}
                                        alt={item.product?.productName}
                                        className="w-14 h-14 rounded-lg object-cover border border-gray-100 bg-gray-50"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/56x56?text=No+Image";
                                        }}
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900">
                                            {item.product?.productName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Qty: {item.quantity}
                                            {item.discount > 0 && (
                                                <span className="text-green-600 font-medium ml-2">
                                                    {item.discount}% off
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        ₹{Number(item.orderedProductPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {selectedUserCheckoutAddress && (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                    Delivering To
                                </p>
                                <p className="text-sm text-slate-700">
                                    <p className="font-medium text-slate-900">
                                        {selectedUserCheckoutAddress.fullName},{" "}{selectedUserCheckoutAddress.phone},
                                    </p>
                                    {selectedUserCheckoutAddress.address},{" "}
                                    {selectedUserCheckoutAddress.city}, {selectedUserCheckoutAddress.state} -{" "}
                                    {selectedUserCheckoutAddress.pincode}
                                </p>
                            </div>
                        )}

                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Total Paid</span>
                            <span className="text-base font-bold text-slate-900">
                                ₹{Number(orderConfirmation.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500 space-y-1">
                            <p>Payment via {orderConfirmation.payment?.pgName}</p>
                            <div className="flex items-center gap-2">
                                <p>Transaction ID: {orderConfirmation.payment?.pgPaymentId}</p>
                                <button
                                    onClick={() => handleCopy(orderConfirmation.payment?.pgPaymentId)}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                    title="Copy Transaction ID"
                                >
                                    <MdContentCopy size={13} />
                                </button>
                                {copied && <span className="text-green-600">Copied!</span>}
                            </div>
                            <p>Status: {orderConfirmation.payment?.pgStatus}</p>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                to="/products"
                                className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-slate-700 rounded-xl px-6 py-3 font-semibold transition"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                to="/orders"
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition"
                            >
                                View All Orders
                            </Link>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PaymentConfirmation
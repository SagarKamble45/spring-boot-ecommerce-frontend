import React from "react";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-gray-100 p-6 rounded-full shadow-sm">
        <span className="text-6xl">🛒</span>
      </div>

      <h1 className="mt-6 text-3xl font-bold text-gray-800">
        Your Cart is Empty
      </h1>

      <p className="mt-3 text-gray-500 max-w-md">
        Looks like you haven't added any products to your cart yet.
        Browse our collection and find something you love.
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default EmptyCart;
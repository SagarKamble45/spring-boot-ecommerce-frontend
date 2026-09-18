import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className="min-h-screen bg-[#f4f8ff] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-xl p-12 text-center">

        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-5xl">
          👋
        </div>

        <div className="mt-8">
          <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-medium">
            Logged Out Successfully
          </span>
        </div>

        <h1 className="text-5xl font-bold text-slate-900 mt-8">
          See You Soon!
        </h1>

        <p className="text-gray-600 text-lg mt-4 leading-relaxed">
          Your session has ended securely.
          Thank you for visiting E-Shop.
          Come back anytime to explore the latest collections.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="px-5 py-3 bg-[#edf4ff] rounded-full text-blue-600 font-medium">
            Secure Logout
          </div>

          <div className="px-5 py-3 bg-[#edf4ff] rounded-full text-blue-600 font-medium">
            Privacy Protected
          </div>

          <div className="px-5 py-3 bg-[#edf4ff] rounded-full text-blue-600 font-medium">
            Shop Anytime
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login Again
          </Link>

          <Link
            to="/"
            className="border border-gray-300 px-8 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/action";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(
    {mode:"onTouched"}
  );

  const loginHandler = (data) => {
    console.log("Login");
    dispatch(authenticateSignInUser(data, toast,reset,navigate, setLoader))
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-[#edf4ff] p-12 flex flex-col justify-center">
          <span className="w-fit px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
            ✨ Welcome
          </span>

          <h1 className="text-5xl font-bold text-slate-900 mt-6">
            Login to
            <span className="block text-blue-600">E-Shop</span>
          </h1>

          <p className="text-slate-600 mt-4 text-lg">
            Continue shopping, manage orders, track deliveries
            and explore the latest collections.
          </p>

          <div className="flex gap-4 mt-10">
            <div className="px-5 py-3 bg-white rounded-full shadow">
              Secure Login
            </div>

            <div className="px-5 py-3 bg-white rounded-full shadow">
              Fast Checkout
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-12 flex items-center">
          <form
            onSubmit={handleSubmit(loginHandler)}
            className="w-full space-y-5"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Sign In
              </h2>

              <p className="text-slate-500 mt-1">
                Enter your credentials to continue
              </p>
            </div>

            <InputField
              label="Username"
              id="username"
              type="text"
              register={register}
              errors={errors}
              required={true}
              message="*Username is required"
              placeholder="Enter your username"
            />

            <InputField
              label="Password"
              id="password"
              type="password"
              register={register}
              errors={errors}
              required={true}
              min={6}
              message="Password is required"
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              {/* Later we build this functionality */}
              {/* <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" />
                Remember me
              </label> */}

              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loader}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
            > {loader ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner />
                <span>Logging in....</span>
              </div>
            ) : (<>Login</>)}
              
            </button>

            <p className="text-center text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
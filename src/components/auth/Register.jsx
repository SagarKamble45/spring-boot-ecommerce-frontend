import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerNewUser } from "../../store/action";
import Spinner from "../Spinner";

function Register1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const registerHandler = (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#edf4ff] p-12 flex flex-col justify-center">
          <span className="w-fit px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
            🚀 Join E-Shop
          </span>

          <h1 className="text-5xl font-bold text-slate-900 mt-6">
            Create Your
            <span className="block text-blue-600">Account</span>
          </h1>

          <p className="text-slate-600 mt-4 text-lg">
            Sign up to enjoy a seamless shopping experience, save your favorite
            products, track orders, and get exclusive offers.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <div className="px-5 py-3 bg-white rounded-full shadow">
              Fast Signup
            </div>

            <div className="px-5 py-3 bg-white rounded-full shadow">
              Secure Account
            </div>

            <div className="px-5 py-3 bg-white rounded-full shadow">
              Exclusive Deals
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-12 flex items-center">
          <form
            onSubmit={handleSubmit(registerHandler)}
            className="w-full space-y-5"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Sign Up</h2>

              <p className="text-slate-500 mt-1">
                Create your account to get started
              </p>
            </div>

            <InputField
              label="Username"
              id="username"
              type="text"
              register={register}
              errors={errors}
              required={true}
              message="Username is required"
              placeholder="Enter username"
            />

            <InputField
              label="Email"
              id="email"
              type="email"
              register={register}
              errors={errors}
              required={true}
              message="Email is required"
              placeholder="Enter email address"
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
              placeholder="Enter password"
            />

            {/* Role */}
            {/* <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>

              <select
                {...register("role", {
                  required: "Role is required",
                })}
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-slate-200
                  rounded-xl
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                "
              >
                <option value="">Select Role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div> */}

            <button
              type="submit"
              disabled={loader}
              className="
                w-full
                py-3
                bg-blue-600
                text-white
                font-semibold
                rounded-xl
                hover:bg-blue-700
                transition-all
              "
            >
              {loader ? (
                <div className="flex items-center justify-center gap-3">
                  <Spinner />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register1;

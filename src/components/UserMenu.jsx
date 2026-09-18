import { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../store/action";
import toast from "react-hot-toast";

function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const LogOutHandler = () =>{
    dispatch(logOutUser(navigate, toast))
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
        w-full md:w-auto
          flex items-center gap-3 justify-center md:justify-start
          px-2 py-1.5
          rounded-full
          bg-white/70
          backdrop-blur-xl
          border border-white/60
          shadow-sm
          hover:shadow-lg
          transition-all duration-300
        "
      >
        <div
          className="
            h-9 w-9
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            text-white
            flex items-center
            justify-center
            text-sm
            font-semibold
            shadow-md
          "
        >
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <span className="hidden md:block text-sm font-medium text-slate-800">
          {user?.username}
        </span>

        <FaChevronDown
          className={`text-xs text-slate-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute right-0 mt-3 w-72
          transition-all duration-300
          ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }
        `}
      >
        <div
          className="
            overflow-hidden
            rounded-3xl
            bg-white/90
            backdrop-blur-xl
            border border-white
            shadow-2xl
          "
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4">
              <div
                className="
                  h-12 w-12
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-indigo-600
                  text-white
                  flex items-center
                  justify-center
                  font-bold
                "
              >
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {user?.username}
                </p>

                <p className="text-xs text-slate-500">
                  Welcome back 👋
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
            >
              <FaUser className="text-slate-500" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
            >
              <FaBoxOpen className="text-slate-500" />
              <span>My Orders</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
            >
              <FaHeart className="text-slate-500" />
              <span>Wishlist</span>
            </Link>

            <Link
              to="/addresses"
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
            >
              <FaMapMarkerAlt className="text-slate-500" />
              <span>Addresses</span>
            </Link>

            <div className="border-t border-slate-100 my-2" />

            <button
              onClick={LogOutHandler}
              className="
                w-full
                text-left
                flex items-center gap-3
                px-5 py-3
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
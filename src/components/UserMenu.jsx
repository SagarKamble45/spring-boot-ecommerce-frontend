import { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserShield,
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
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

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

  const LogOutHandler = () => {
    setIsOpen(false);
    dispatch(logOutUser(navigate, toast));
  };

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

      <div
        className={`
    mt-3 w-full
    md:absolute md:right-0 md:w-72 md:z-50 md:origin-top
    md:transition-all md:duration-300
    ${
      isOpen
        ? "opacity-100 visible md:scale-y-100"
        : "hidden md:block opacity-0 invisible md:scale-y-0 pointer-events-none"
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
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">
                    {user?.username}
                  </p>
                  {isAdmin && (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">Welcome back 👋</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition text-slate-700"
            >
              <FaUser className="text-slate-500" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition text-slate-700"
            >
              <FaBoxOpen className="text-slate-500" />
              <span>My Orders</span>
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition text-slate-700"
            >
              <FaHeart className="text-slate-500" />
              <span>Wishlist</span>
            </Link>

            <Link
              to="/addresses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition text-slate-700"
            >
              <FaMapMarkerAlt className="text-slate-500" />
              <span>Addresses</span>
            </Link>

            {isAdmin && (
              <>
                <div className="border-t border-slate-100 my-1" />
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition text-slate-700 font-medium"
                >
                  <FaUserShield className="text-blue-600" />
                  <span>Admin Dashboard</span>
                </Link>
              </>
            )}

            <div className="border-t border-slate-100 my-1" />

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
                font-medium
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

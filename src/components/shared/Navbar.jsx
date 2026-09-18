import { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import { FaShoppingCart, FaStore, FaBars, FaTimes } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

function Navbar() {
  const location = useLocation();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  const handleCloseNavbar = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="max-w-6xl mx-auto">
        <nav className="relative h-16 px-5 md:px-8 flex items-center justify-between rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleCloseNavbar}
            className="flex items-center gap-3"
          >
            <FaStore className="text-xl text-slate-800" />
            <span className="text-lg md:text-xl font-semibold text-slate-900">
              E-Shop
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsNavbarOpen((prev) => !prev)}
            className="md:hidden text-slate-800 transition-transform duration-300"
          >
            <div
              className={`transition-transform duration-300 ${
                isNavbarOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {isNavbarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </div>
          </button>

          {/* Navigation + Actions Container */}
          <div
            className={`
              absolute md:static
              top-20 md:top-auto
              left-1/2 md:left-auto
              -translate-x-1/2 md:translate-x-0
              
              w-[95%] md:w-auto
              
              bg-white md:bg-transparent
              border border-gray-200 md:border-0
              rounded-3xl md:rounded-none
              shadow-lg md:shadow-none

              p-6 md:p-0

              flex flex-col md:flex-row
              items-center
              gap-6 md:gap-8

              transition-all duration-300 ease-in-out

              ${
                isNavbarOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-3 md:opacity-100 md:visible md:translate-y-0"
              }
            `}
          >
            {/* Navigation */}
            <ul className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <li>
                <Link
                  to="/"
                  onClick={handleCloseNavbar}
                  className={`text-sm transition-all duration-200 ${
                    isActive("/")
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  onClick={handleCloseNavbar}
                  className={`text-sm transition-all duration-200 ${
                    isActive("/products")
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={handleCloseNavbar}
                  className={`text-sm transition-all duration-200 ${
                    isActive("/about")
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={handleCloseNavbar}
                  className={`text-sm transition-all duration-200 ${
                    isActive("/contact")
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Actions */}
            <ul className="flex flex-col md:flex-row items-center gap-5 md:gap-6 w-full md:w-auto">
              <li>
                <Link
                  to="/cart"
                  onClick={handleCloseNavbar}
                  className={`transition-all duration-200 ${
                    isActive("/cart")
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Badge
                    showZero
                    badgeContent={cart?.length || 0}
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <FaShoppingCart size={22} />
                  </Badge>
                </Link>
              </li>

              {user && user.id ? (
                <li className="w-full md:w-auto">
                  <UserMenu user={user} />
                </li>
              ) : (
                <li className="w-full md:w-auto">
                  <Link
                    to="/login"
                    onClick={handleCloseNavbar}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
                  >
                    <CiLogin size={18} />
                    <span>Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

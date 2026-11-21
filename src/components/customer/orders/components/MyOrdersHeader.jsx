import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function MyOrdersHeader() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs text-text-light"
    >
      <Link to="/" className="transition hover:text-primary">
        Home
      </Link>

      <ChevronRight size={13} />

      <Link to="/profile" className="transition hover:text-primary">
        My Account
      </Link>

      <ChevronRight size={13} />

      <span className="font-semibold text-text">
        My Orders
      </span>
    </nav>
  );
}

export default MyOrdersHeader;
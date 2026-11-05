
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ publicPage = false, adminOnly = false }) {
  const { user } = useSelector((state) => state.auth);

  const isAuthenticated = Boolean(user);

  const isAdmin = Boolean(
    user?.roles?.includes("ROLE_ADMIN")
  );

  // Prevent authenticated users from accessing login/register.
  if (publicPage) {
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  }

  // Admin-only routes.
  if (adminOnly) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
      return <Navigate to="/403" replace />;
    }

    return <Outlet />;
  }

  // Routes requiring authentication.
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;

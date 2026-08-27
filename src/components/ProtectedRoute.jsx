import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GovLoader from "./GovLoader";

export default function ProtectedRoute({ role, children }) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <GovLoader label="Authenticating session…" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if active user has been revoked/suspended
  if (
    user.active === false ||
    user.enabled === false ||
    user.status === "SUSPENDED" ||
    user.status === "REVOKED"
  ) {
    if (logout) logout();
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // If the user's role doesn't match, route them to their corresponding dashboard
    if (user.role === "STUDENT") return <Navigate to="/student/dashboard" replace />;
    if (user.role === "HOD") return <Navigate to="/hod/dashboard" replace />;
    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

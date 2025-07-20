import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  requireAdmin = false,
  children,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Requires admin but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  // User is authenticated and has required role
  return children ? <>{children}</> : <Outlet />;
};

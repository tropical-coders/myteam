import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, redirectTo = "/" }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;

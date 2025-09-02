import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, redirectPath = "/dashboard" }) => {
  return isAuthenticated ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoute;

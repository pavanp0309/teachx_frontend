import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  if (!token) return <Navigate to="/login" />;
  if (!role) return <h1>Loading...</h1>;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "../features/auth/authSlice.js";

const ProtectedRoute = ({ isPublic = false }) => {
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);

  if (isPublic && userStatus && user?.email) {
    return <Navigate to="/" replace />;
  }

  if (!isPublic && (!userStatus || !user?.email)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

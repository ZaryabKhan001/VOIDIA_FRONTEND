import React from "react";
import { selectUser, selectUserStatus } from "../features/user/userSlice.js";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);

  if (!userStatus) {
    return <Navigate to="/login" replace />;
  }

  //* Add when implement verify email functionality
  // if (!user?.isVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }

  return children;
};

export default ProtectedRoute;

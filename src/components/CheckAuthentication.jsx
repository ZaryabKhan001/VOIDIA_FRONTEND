import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectUser, selectUserStatus } from "../features/user/userSlice.js";

const CheckAuthentication = ({ children }) => {
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === true && user?.email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CheckAuthentication;

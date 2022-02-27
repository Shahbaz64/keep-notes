import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/constants/path.constant";
import { useSelector } from "react-redux";

const CustomRoutes = () => {
  const userId = useSelector((state) => state.authReducer.user.userId);
  return userId ? <Outlet /> : <Navigate to={path.SIGNIN} />;
};

export default CustomRoutes;

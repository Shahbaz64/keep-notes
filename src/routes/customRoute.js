import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/constants/path.constant";

const CustomRoutes = ({ userId }) => {
  return userId ? <Outlet /> : <Navigate to={path.SIGNIN} />;
};

CustomRoutes.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default CustomRoutes;

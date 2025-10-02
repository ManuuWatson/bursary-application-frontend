// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // ✅ Check if staff token exists in localStorage
  const staffToken = localStorage.getItem("staffToken");

  if (!staffToken) {
    // If no token → redirect to staff login
    return <Navigate to="/staff-login" replace />;
  }

  // If token exists → allow access
  return children;
};

export default PrivateRoute;

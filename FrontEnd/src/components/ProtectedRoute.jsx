// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/landing" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/landing" replace />;
  }

  return element;
};

export default ProtectedRoute;

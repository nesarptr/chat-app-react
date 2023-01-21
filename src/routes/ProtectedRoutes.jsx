import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function PrivateRoute(props) {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return props.children;
  }
  return <Navigate replace to="/login" />;
}

function NonAuthRoute(props) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return props.children;
  }
  return <Navigate replace to="/" />;
}

export { PrivateRoute, NonAuthRoute };

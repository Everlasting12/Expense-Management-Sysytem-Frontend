import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.loginReducer.token);

  if (token) {
    return children;
  }

  // return <Navigate to={"/"} />;
  return <Navigate to={"/login"} />;
};

export default ProtectedRoute;

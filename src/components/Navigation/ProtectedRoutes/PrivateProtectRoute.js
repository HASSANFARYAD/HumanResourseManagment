import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const user = useSelector((state) => state?.auth?.userAuth);
  const { data } = user;
  return (
    <Route
      {...rest}
      render={() => (data ? <Component {...rest} /> : <Navigate to="/login" />)}
    />
  );
};

export default PrivateProtectRoute;

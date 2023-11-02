import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const user = useSelector((state) => state?.auth?.authUser);
  const { data } = user;
  const isAdmin = data?.role;
  return (
    <Route
      {...rest}
      render={() =>
        isAdmin ? <Component {...rest} /> : <Navigate to="/login" />
      }
    />
  );
};

export default AdminRoute;

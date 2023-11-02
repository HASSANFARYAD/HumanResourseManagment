import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedLayout() {
  const user = useSelector((state) => state?.auth?.userAuth);

  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
}

export default ProtectedLayout;

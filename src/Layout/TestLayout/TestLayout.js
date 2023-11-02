import React from "react";
import { useSelector } from "react-redux";
import PrivateNavbar from "../../components/Navigation/Private/PrivateNavbar";
import { Navigate, Outlet } from "react-router-dom";

const TestLayout = () => {
  const data = useSelector((state) => state?.auth?.userAuth);
  return <div>{data ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default TestLayout;

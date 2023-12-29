import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { GetSideBarPermission } from "../../utils/Permission/SideBarPermission";

const ProtectedLayout = () => {
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);
  const getURlLOcation = useLocation();
  const checkPermission = GetSideBarPermission(loggedInUser?.role);
  const checkRole = checkPermission?.some(
    (item) => item.Name === getURlLOcation.pathname
  );
  console.log("check role:", checkRole);
  return (
    <>
      {loggedInUser ? (
        checkRole ? (
          <Outlet />
        ) : (
          <Navigate to="/home" />
        )
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedLayout;

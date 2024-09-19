import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AppLogout from "../../utils/_logoutHandler";
import { SignalRProvider } from "../../hooks/signalR";

const ProtectedLayout = () => {
  const userAuth = useSelector((state) => state?.authentication?.userAuth);

  return (
    <>
      {userAuth ? (
        <SignalRProvider>
          <AppLogout>
            <Outlet />
          </AppLogout>
        </SignalRProvider>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedLayout;

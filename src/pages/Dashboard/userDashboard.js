import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserDashboard = () => {
  const data = useSelector((state) => state?.authentication?.userAuth);
  if (data.role === "0") {
    return <Navigate to="/admin" />;
  }
  return <div>User Dashboard</div>;
};

export default UserDashboard;

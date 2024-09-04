import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const AdminDashboard = () => {
  const data = useSelector((state) => state?.authentication?.userAuth);

  if (data.role !== "0") {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <h3>Admin Dashboard</h3>
    </div>
  );
};

export default AdminDashboard;

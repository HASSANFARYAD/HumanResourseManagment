import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state?.auth?.userAuth?.data);

  return (
    <>
      {loggedInUser.role === "Admin" ? (
        <AdminDashboard />
      ) : (
        <div className="h1">User Dashboard</div>
      )}
    </>
  );
};

export default Dashboard;

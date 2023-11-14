import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const loggedInUser = useSelector((state) => state?.auth?.userAuth);

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

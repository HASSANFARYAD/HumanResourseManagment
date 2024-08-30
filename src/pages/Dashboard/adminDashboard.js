import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const data = useSelector((state) => state?.authentication?.userAuth);
  if(data.role !== "0"){
    return <Navigate to="/home"/>
  }
  return (
    <div>adminDashboard</div>
  )
}

export default AdminDashboard
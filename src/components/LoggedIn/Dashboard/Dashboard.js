import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardCounts } from "../../../redux/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.admin?.values);

  useEffect(() => {
    dispatch(dashboardCounts());
  }, [dispatch]);

  return (
    <>
      <div className="row">
        <div className="col-md-3 offset-md-3">
          <div
            className="card w-100 text-center text-white p-5"
            style={{ background: "#196f9c" }}
          >
            <h4>Total Customers</h4>
            <h2 className="fw-medium">{data?.customer}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card w-100 text-center text-white p-5"
            style={{ background: "#196f9c" }}
          >
            <h4>Total Valet</h4>
            <h2 className="fw-medium">{data?.valet}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";

const Index = (props) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-0 bg-dark">
              <Sidebar />
            </div>
            <div className="col py-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

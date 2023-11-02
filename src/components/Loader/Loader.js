import React from "react";
import "./Loader.css";
import loader from "./loader.gif";

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <div className="loader"></div>
        {/* <img src={loader} /> */}
      </div>
    </>
  );
};

export default Loader;

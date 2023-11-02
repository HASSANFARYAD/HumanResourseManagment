import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";

const Navbar = () => {
  //get user from store
  const data = useSelector((state) => state?.auth?.userAuth);
  const isAdmin = data?.role;
  const token = data?.token;

  return (
    <>
      {/* {isAdmin === "Admin" ? (
        <AdminNavbar isLogin={data} />
      ) : data ? (
        <PrivateNavbar isLogin={data} />
      ) : (
        <PublicNavbar />
      )} */}
    </>
  );
};

export default Navbar;

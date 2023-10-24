import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  //get user from store
  const data = useSelector((state) => state?.auth?.userAuth);
  const isAdmin = data?.role;
  const token = data?.token;

  return (
    <>
      {isAdmin ? <AdminNavbar isLogin={token} /> : <PublicNavbar />}
      {/* display success msg */}
      {token}
    </>
  );
};

export default Navbar;

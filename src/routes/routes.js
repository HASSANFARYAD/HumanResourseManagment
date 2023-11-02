import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "../components/LoggedIn/Index";
import AuthIndex from "../components/Auth/AuthIndex";
import UpdatePassword from "../components/LoggedIn/UpdatePassword/UpdatePassword";
import UserProfile from "../components/LoggedIn/UserProfile/UserProfile";
import Dashboard from "../components/LoggedIn/Dashboard/Dashboard";
import AddUser from "../components/LoggedIn/Admin/AddUser/AddUser";
import UserList from "../components/LoggedIn/Admin/UserList/UserList";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Index />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update-profile" element={<UserProfile />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/users" element={<UserList />} />
          </Route>
          <Route path="/auth" element={<AuthIndex />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navigation/Navbar";
import HomePage from "./components/HomePage/HomePage";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import Profile from "./components/Auth/Profile/Profile";
import { useSelector } from "react-redux";
import User from "./Layout/UserLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import UserLayout from "./Layout/UserLayout";
import PrivateNavbar from "./components/Navigation/Private/PrivateNavbar";
import TestLayout from "./Layout/TestLayout/TestLayout";

function App() {
  const user = useSelector((state) => state?.auth?.userAuth);
  return (
    <Router>
      {/* {user ? (
        <>
          <Navbar />
        </>
      ) : (
        <Routes>
          <Route element={<PrivateNavbar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )} */}
      <Routes>
        <Route element={<TestLayout />}>
          <Route element={<PrivateNavbar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

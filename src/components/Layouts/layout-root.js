import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery, Box } from "@mui/material";
import Sidebar from "../Sidebar/sidebar";
import Navbar from "../Navbar/navbar";
import { useThemeContext } from "../../theme-styles/themeContext"; // Import theme context

const drawerWidth = 280;
const drawerWidthCollapsed = 60;

const RootLayout = () => {
  const { darkMode } = useThemeContext(); // Access the darkMode from theme context
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const userAuth = useSelector((state) => state?.authentication?.userAuth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  if (Object.keys(userAuth).length === 0) {
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        margin: 0,
        backgroundColor: darkMode ? "#121212" : "#E8EAF6", // Dark mode aware background
        color: darkMode ? "#ffffff" : "#333", // Dark mode aware text color
      }}
    >
      {/* Navbar */}
      <Box
        component="header"
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 1200,
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} />
      </Box>

      {/* Main layout */}
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
        <Box
          component="nav"
          sx={{
            width: isSidebarOpen ? drawerWidth : drawerWidthCollapsed,
            flexShrink: 0,
            transition: "width 0.3s",
            zIndex: 1000,
            position: isMobile ? "absolute" : "fixed",
            display: isMobile ? (isSidebarOpen ? "block" : "none") : "block",
            left: 0,
            backgroundColor: darkMode ? "#1F1F1F" : "#fff", // Dark mode aware sidebar background
          }}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            marginLeft: isMobile
              ? "0"
              : isSidebarOpen
              ? `${drawerWidth}px`
              : `${drawerWidthCollapsed}px`,
            transition: "margin-left 0.3s ease",
            backgroundColor: darkMode ? "#121212" : "#f0f0f0", // Dark mode aware content background
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayout;

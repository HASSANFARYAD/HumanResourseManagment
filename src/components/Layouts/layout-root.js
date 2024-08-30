import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme, Box } from "@mui/material";
import Sidebar from '../Sidebar/sidebar'
import Navbar from "../Navbar/navbar";

const drawerWidth = 280;
const drawerWidthCollapsed = 60;

const RootLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userAuth = useSelector((state) => state?.authentication?.userAuth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile); // Default to open if not on mobile

  if (Object.keys(userAuth).length === 0) {
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', margin:0 }}>
      <Box
        component="header"
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          zIndex: 1200,
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} />
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>        
        <Box
          component="nav"
          sx={{
            width: isSidebarOpen ? drawerWidth : drawerWidthCollapsed,
            flexShrink: 0,
            transition: 'width 0.3s',
            zIndex: 1000,
            position: isMobile ? 'absolute' : 'fixed',
            display: isMobile ? (isSidebarOpen ? 'block' : 'none') : 'block',
            left: 0,
            backgroundColor:"#fff",
          }}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            marginLeft: isMobile ? '0' : isSidebarOpen ? `${drawerWidth}px` :`${drawerWidthCollapsed}px`, // Adjust margin based on sidebar state and screen size
            transition: 'margin-left 0.3s ease',
            marginTop: 0,
            backgroundColor: '#f1f1f1',
            color:"#333"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayout;

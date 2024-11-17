import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

function AuthLayout() {
  return (
    <Box
      id="wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        id="content-wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          backgroundColor: 'background.default',
        }}
      >
        {/* <Container
          id="content"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            py: 2,
          }}
        >
        </Container> */}
          <Outlet />
      </Box>
    </Box>
  );
}

export default AuthLayout;

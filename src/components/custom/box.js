import { Box, Typography } from "@mui/material";
import React from "react";

const CustomBox = ({ icon, value1, value2 }) => {
  return (
    <>
      <Box display="flex" px={3} py={2}>
        <Box className="icon" mr={2}>
          {icon}
        </Box>
        <Box>
          <Typography variant="h4">{value1}</Typography>
          <Typography variant="body1">{value2}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomBox;

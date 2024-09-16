import React from "react";
import { Container, Typography, Box } from "@mui/material";
import CustomCard from "../../theme-styles/customCard";
import { useSelector } from "react-redux";
import { useThemeContext } from "../../theme-styles/themeContext";

const BreadCrumb = ({ pageName }) => {
  var { userAuth } = useSelector((state) => state?.authentication);
  const { darkMode } = useThemeContext();
  var userName = userAuth?.userName;
  return (
    <Container maxWidth="lg">
      <CustomCard
        sx={{
          backgroundImage: darkMode
            ? "linear-gradient(195deg, #333, #777,#333)"
            : "linear-gradient(65deg, #D60BFF, #304FFE,#D60BFF)",
          color: darkMode ? "fff" : "#fff",
          padding: 5,
        }}
      >
        <Typography variant="subtitle2" sx={{ margin: 0 }}>
          Hello,
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", margin: 0 }}>
          Welcome! {userName ? `${userName}` : "Valued User"}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", margin: 0 }}>
          Delivering Excellence in Every Step
        </Typography>
        <Box
          sx={{
            display: "inline-block", // Ensures the width is only as wide as the content
            borderRadius: "50px",
            marginTop: 2,
            background: darkMode ? "#f9f9f9" : "#333",
            padding: "4px 16px",
            paddingBottom: "6px",
            textAlign: "center",
            whiteSpace: "nowrap", // Prevents wrapping of text
            color: darkMode ? "#333" : "#fff",
          }}
        >
          {pageName}
        </Box>
      </CustomCard>
    </Container>
  );
};

export default BreadCrumb;

import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a context to manage theme
const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#E8EAF6", // default background
        emphasis: darkMode ? "#1F1F1F" : "#E8EAF6",
        secondary: darkMode ? "#2C2C2C" : "#C5CAE9",
        header: darkMode ? "#1C1C1E" : "#121037",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#1A237E",
        secondary: darkMode ? "#CFCFCF" : "#5C6BC0",
        hint: darkMode ? "#888888" : "#9FA8DA",
      },
      primary: {
        main: darkMode ? "#BB86FC" : "#304FFE",
        light: darkMode ? "#BB86FC" : "#536DFE",
        dark: darkMode ? "#3700B3" : "#1A237E",
      },
      secondary: {
        main: darkMode ? "#03DAC6" : "#D48800",
        light: darkMode ? "#03DAC6" : "#ffd740",
        dark: darkMode ? "#018786" : "#6c757d",
      },
      contentBody: {
        backgroundColor: darkMode ? "#121212" : "#f0f0f0",
      },
      contrastThreshold: 1.8,
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFF",
      emphasis: "#E8EAF6",
      secondary: "#C5CAE9",
      header: "#121037",
    },
    text: {
      primary: "#1A237E",
      secondary: "#5C6BC0",
      hint: "#9FA8DA",
    },
    primary: {
      main: "#304FFE",
      light: "#536DFE",
      dark: "#1A237E",
    },
    secondary: {
      main: "#FFAB00",
      light: "#ffd740",
      dark: "#6c757d",
    },
    contentBody: {
      backgroundColor: "#f0f0f0",
    },
    contrastThreshold: 1.8,
  },
});

export default theme;

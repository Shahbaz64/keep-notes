import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routers from "routes";
import { useSelector } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    secondary: {
      main: "#FFC107",
    },
    primary: {
      light: "rgba(241, 243, 244, 0.24)",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fefefe",
    },
    secondary: {
      main: "#FFC107",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const App = () => {
  const mode = useSelector((state) => state.toggleReducer.mode);
  return (
    <ThemeProvider theme={mode ? darkTheme : lightTheme}>
      <Routers />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;

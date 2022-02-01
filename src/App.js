import React from "react";
// import Home from "views/home/home";
import { CssBaseline } from "@mui/material";
// import SignIn from "views/signIn/signIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routers from "routes";

// import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
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
  return (
    <ThemeProvider theme={theme}>
      <Routers />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;

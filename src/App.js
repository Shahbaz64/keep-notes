import React from "react";
import HomePage from "views/home/home";
import { CssBaseline } from "@mui/material";
import SignInPage from "views/signIn/signIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: {
      main: "#FFC107",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignInPage />}></Route>
          <Route exact path="/home" element={<HomePage />}></Route>
        </Routes>
      </Router>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserRoutes from "routes/userRoutes";
import { useSelector } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    secondary: {
      main: "#FFC107",
      light: "#41331C",
    },
    primary: {
      main: "rgba(241, 243, 244, 0.24)",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ["Google Sans", "Open Sans"].join(","),
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
      light: "#FEEFC3",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ["Google Sans", "Open Sans"].join(","),
  },
});

const App = () => {
  const theme = useSelector((state) => state.toggleReducer.darkMode);
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <UserRoutes />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;

import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
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
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const lightTheme = createTheme({
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
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

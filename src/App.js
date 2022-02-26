import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import UserRoutes from "routes/userRoutes";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "utils/constants/theme.constat";

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

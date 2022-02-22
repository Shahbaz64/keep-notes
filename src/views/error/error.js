import React from "react";
import { useNavigate } from "react-router-dom";
import { style } from "views/error/error.style";
import { Button, Typography } from "@mui/material";
import path from "utils/constants/path.constant";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ ...style.error }}>
      <Typography variant="h2" color="error">
        page not found
      </Typography>
      <Button
        sx={{ ...style.btn }}
        varinat="text"
        color="inherit"
        onClick={() => navigate(path.SIGNIN)}
      >
        Back to SignIn Page
      </Button>
    </div>
  );
};

export default ErrorPage;

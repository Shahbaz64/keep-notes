import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useStyles } from "components/progress-bar/progressBar.style";

const ProgressBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default ProgressBar;

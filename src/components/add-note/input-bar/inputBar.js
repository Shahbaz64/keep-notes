import React from "react";
import { Card } from "@mui/material";
import { hideInputBar } from "store";
import { useDispatch } from "react-redux";
import { useStyles } from "components/add-note/input-bar/inputBar.style";

const InputBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card
      elevation={4}
      className={classes.inputBar}
      onClick={() => dispatch(hideInputBar())}
    >
      Take a Note...
    </Card>
  );
};

export default InputBar;

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Drawer as MuiDrawer } from "@mui/material";
import { useStyles } from "components/drawer/drawer.style";
import ItemList from "components/drawer/items-list/itemsList";

const Drawer = ({ handleDialog }) => {
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const labels = useSelector((state) => state.notesReducer.labels);
  const classes = useStyles();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpenDrawer}
    >
      <ItemList handleDialog={handleDialog} labels={labels} />
    </MuiDrawer>
  );
};

Drawer.propTypes = {
  handleDialog: PropTypes.func.isRequired,
};

export default Drawer;

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Drawer as MuiDrawer } from "@mui/material";
import { useStyles } from "components/drawer/drawer.style";
import ItemList from "components/drawer/items-list/itemsList";
import { labelPropType } from "utils/constants/prop-types.constant";

const Drawer = ({ handleDialog, labels }) => {
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
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
  labels: labelPropType,
};

Drawer.defaultProps = {
  labels: [],
};

export default Drawer;

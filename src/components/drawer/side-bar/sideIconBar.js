import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import IconList from "components/drawer/icons-list/iconsList";
import { useStyles } from "components/drawer/side-bar/sideIconBar.style";

const SideIconBar = ({ handleDialog }) => {
  const classes = useStyles();
  const labels = useSelector((state) => state.notesReducer.labels);
  const isOpenSideIconBar = useSelector(
    (state) => state.toggleReducer.isOpenSideIconBar
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpenSideIconBar}
    >
      <IconList handleDialog={handleDialog} labels={labels} />
    </Drawer>
  );
};

SideIconBar.propTypes = {
  handleDialog: PropTypes.func.isRequired,
};

export default SideIconBar;

import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import GridViewIcon from "@mui/icons-material/GridView";
import { useSelector } from "react-redux";

const Actions = ({ handleNotesView, handleThemeMode, handleSignOut }) => {
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);

  const actions = [
    {
      icon: toggleView ? <SplitscreenOutlinedIcon /> : <GridViewIcon />,
      title: toggleView ? "ListView" : "Grid View",
      handleClick: handleNotesView,
    },
    {
      icon: <InvertColorsIcon />,
      title: "Dark Mode",
      handleClick: handleThemeMode,
    },
    {
      icon: <LogoutIcon />,
      title: "Logout",
      handleClick: handleSignOut,
    },
  ];
  return (
    <div>
      {actions.map((icon) => (
        <Tooltip key={nanoid()} title={icon.title}>
          <IconButton onClick={icon.handleClick} size="large">
            {icon.icon}
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
};

Actions.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  handleNotesView: PropTypes.func,
  handleThemeMode: PropTypes.func,
};

export default Actions;

import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import Brightness6OutlinedIcon from "@mui/icons-material/Brightness6Outlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { useSelector } from "react-redux";

const Actions = ({ handleNotesView, handleThemeMode, handleSignOut }) => {
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const actions = [
    {
      icon: toggleView ? <SplitscreenOutlinedIcon /> : <GridViewIcon />,
      title: toggleView ? "ListView" : "Grid View",
      handleClick: handleNotesView,
    },
    {
      icon: mode ? <Brightness5OutlinedIcon /> : <Brightness6OutlinedIcon />,
      title: mode ? "Light Mode" : "Dark Mode",
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
  handleNotesView: PropTypes.func.isRequired,
  handleThemeMode: PropTypes.func.isRequired,
};

export default Actions;

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
import { style } from "components/appbar/appbar-actions/actions.style";

const Actions = ({ handleNotesView, handleThemeMode, handleSignOut }) => {
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);
  const actions = [
    {
      icon: toggleView ? <GridViewIcon /> : <SplitscreenOutlinedIcon />,
      title: toggleView ? "Grid View" : "ListView",
      handleClick: handleNotesView,
    },
    {
      icon: darkMode ? (
        <Brightness5OutlinedIcon />
      ) : (
        <Brightness6OutlinedIcon />
      ),
      title: darkMode ? "Light Mode" : "Dark Mode",
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
          <IconButton onClick={icon.handleClick} sx={{ ...style.icons }}>
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

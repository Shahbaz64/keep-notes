import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import TableRowsIcon from "@mui/icons-material/TableRows";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

const Actions = ({ handleNotesView, handleThemeMode, handleSignOut }) => {
  const actions = [
    {
      icon: <TableRowsIcon />,
      title: "Grid View",
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
  handleNotesView: PropTypes.func.isRequired,
  handleThemeMode: PropTypes.func.isRequired,
};

Actions.defaultProps = {
  handleSignOut: () => {},
  handleNotesView: () => {},
  handleThemeMode: () => {},
};

export default Actions;

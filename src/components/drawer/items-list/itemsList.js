import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { style } from "components/drawer/items-list/itemsList.style";
import { useLocation, useNavigate } from "react-router-dom";
import path from "utils/constants/path.constant";

const ItemList = ({ handleoNotes, handleDialog, handleBinFolder, labels }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.toggleReducer.mode);

  const listItems = [
    {
      icon: <LightbulbOutlinedIcon />,
      text: "Notes",
      path: path.HOME,
      handleClick: handleoNotes,
    },
    {
      icon: <ModeEditOutlinedIcon />,
      text: "Edit Labels",
      path: "",
      handleClick: handleDialog,
    },
    {
      icon: <DeleteOutlinedIcon />,
      text: "Bin",
      path: path.BIN,
      handleClick: handleBinFolder,
    },
  ];

  return (
    <List>
      {listItems.map((item) => {
        if (item.text === "Edit Labels") {
          {
            return (
              <Fragment key={nanoid()}>
                {labels.map((label) => (
                  <ListItem
                    button
                    key={label.id}
                    onClick={() => {
                      navigate(`${path.LABELS}/${label.name}`);
                    }}
                    sx={
                      location.pathname === `${path.LABELS}/${label.name}`
                        ? mode
                          ? { ...style.darkActive }
                          : { ...style.lightActive }
                        : {}
                    }
                  >
                    <ListItemIcon>
                      <LabelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>{label.name}</ListItemText>
                  </ListItem>
                ))}
                <ListItem button key={nanoid()} onClick={item.handleClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </ListItem>
              </Fragment>
            );
          }
        } else {
          return (
            <ListItem
              button
              key={nanoid()}
              onClick={() => navigate(item.path)}
              sx={
                location.pathname === item.path
                  ? mode
                    ? { ...style.darkActive }
                    : { ...style.lightActive }
                  : {}
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          );
        }
      })}
    </List>
  );
};

ItemList.propTypes = {
  handleDialog: PropTypes.func,
  handleoNotes: PropTypes.func,
  handleBinFolder: PropTypes.func,
  labels: PropTypes.array,
};

ItemList.defaultProps = {
  labels: [],
};

export default ItemList;

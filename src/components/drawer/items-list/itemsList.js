import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { style } from "components/drawer/items-list/itemsList.style";
import { useLocation, useNavigate } from "react-router-dom";
import path from "utils/constants/path.constant";
import { labelPropType } from "utils/constants/prop-types.constant";
import { setAppBarHeader } from "store";

const ItemList = ({ handleDialog, labels }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);

  const listItems = [
    {
      icon: <LightbulbOutlinedIcon />,
      text: "Notes",
      path: path.HOME,
    },
    {
      icon: <ModeEditOutlinedIcon />,
      text: "Edit Labels",
      path: "",
    },
    {
      icon: <DeleteOutlinedIcon />,
      text: "Bin",
      path: path.BIN,
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
                      dispatch(setAppBarHeader(label.name));
                    }}
                    sx={
                      location.pathname === `${path.LABELS}/${label.name}`
                        ? darkMode
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
                <ListItem button key={nanoid()} onClick={handleDialog}>
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
              onClick={() => {
                dispatch(setAppBarHeader(item.text));
                navigate(item.path);
              }}
              sx={
                location.pathname === item.path
                  ? darkMode
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
  labels: labelPropType,
};

ItemList.defaultProps = {
  labels: [],
  handleDialog: () => {},
};

export default ItemList;

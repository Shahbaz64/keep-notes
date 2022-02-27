import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { IconButton, List } from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { style, useStyles } from "components/drawer/icons-list/iconList.style";
import { useLocation, useNavigate } from "react-router-dom";
import path from "utils/constants/path.constant";
import { setAppBarHeader } from "store";
import { labelPropType } from "utils/constants/prop-types.constant";

const IconList = ({ handleDialog, labels }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <List className={classes.iconsList}>
      {listItems.map((item) => {
        if (item.text === "Edit Labels") {
          {
            return (
              <Fragment key={nanoid()}>
                {labels.map((label) => (
                  <IconButton
                    key={label.id}
                    size="large"
                    onClick={() => {
                      dispatch(setAppBarHeader(label.name));
                      navigate(`${path.LABELS}/${label.name}`);
                    }}
                    sx={
                      location.pathname === `${path.LABELS}/${label.name}`
                        ? darkMode
                          ? { ...style.darkActive }
                          : { ...style.lightActive }
                        : {}
                    }
                  >
                    <LabelOutlinedIcon />
                  </IconButton>
                ))}
                <IconButton key={nanoid()} size="large" onClick={handleDialog}>
                  {item.icon}
                </IconButton>
              </Fragment>
            );
          }
        } else {
          return (
            <IconButton
              key={nanoid()}
              size="large"
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
              {item.icon}
            </IconButton>
          );
        }
      })}
    </List>
  );
};

IconList.propTypes = {
  handleDialog: PropTypes.func,
  labels: labelPropType,
};

IconList.defaultProps = {
  labels: [],
  handleDialog: () => {},
};

export default IconList;

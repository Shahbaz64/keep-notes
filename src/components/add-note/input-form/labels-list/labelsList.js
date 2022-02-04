import React from "react";
import PropTypes from "prop-types";
import { List, Popover, ListItem, ListItemText } from "@mui/material";
import {
  useStyles,
  style,
} from "components/add-note/input-form/labels-list/labelList.style";
import { addLabelsChip } from "store";
import { useDispatch } from "react-redux";

const LabelsList = ({ anchor, hideLabels, labels }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={hideLabels}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <List sx={{ ...style.list }}>
        {labels.map((label) => {
          return (
            <ListItem
              button
              key={label.id}
              sx={{ ...style.listItem }}
              onClick={() => {
                dispatch(addLabelsChip({ id: label.id, name: label.name }));
                hideLabels();
              }}
            >
              <ListItemText className={classes.innerText}>
                {label.name}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
};

LabelsList.propTypes = {
  anchor: PropTypes.object,
  hideLabels: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

LabelsList.defaultProps = {
  anchor: null,
  labels: [],
};

export default LabelsList;

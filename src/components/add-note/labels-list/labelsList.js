import React from "react";
import PropTypes from "prop-types";
import {
  List,
  Popover,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  useStyles,
  style,
} from "components/add-note/labels-list/labelList.style";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addLabel } from "store";
import { useSelector } from "react-redux";
import { labelPropType } from "utils/constants/prop-types.constant";

const LabelsList = ({
  anchor,
  hideLabels,
  addLabelChip,
  labels,
  labelTerm,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.user.userId);
  const filteredLabels = labels.filter((label) => {
    return label.name.includes(labelTerm);
  });

  const createLabelHandler = async () => {
    if (labelTerm) {
      const labelNames = labels.map((label) => label.name);
      if (!labelNames.includes(labelTerm)) {
        const label = await dispatch(
          addLabel({ userId: userId, label: labelTerm })
        );
        addLabelChip(label.payload.id, label.payload.name);
      }
    }
    hideLabels();
  };

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
        {filteredLabels.map((label) => {
          return (
            <ListItem
              button
              key={label.id}
              sx={{ ...style.listItem }}
              onClick={() => {
                addLabelChip(label.id, label.name);
                hideLabels();
              }}
            >
              <ListItemText className={classes.innerText}>
                {label.name}
              </ListItemText>
            </ListItem>
          );
        })}
        {filteredLabels.length !== 0 && <Divider />}
        <ListItem
          button
          sx={{ ...style.listItem }}
          onClick={createLabelHandler}
        >
          <AddIcon fontSize="small" />
          <Typography variant="body2" sx={{ ...style.itemText }}>
            create `{labelTerm}`
          </Typography>
        </ListItem>
      </List>
    </Popover>
  );
};

LabelsList.propTypes = {
  anchor: PropTypes.object,
  hideLabels: PropTypes.func.isRequired,
  addLabelChip: PropTypes.func.isRequired,
  labels: labelPropType,
  labelTerm: PropTypes.string,
};

LabelsList.defaultProps = {
  anchor: null,
  labels: [],
  labelTerm: "",
};

export default LabelsList;

import React from "react";
import PropTypes from "prop-types";
import {
  List,
  Popover,
  ListItem,
  ListItemText,
  Divider,
  // ListItemIcon,
  Typography,
} from "@mui/material";
import {
  useStyles,
  style,
} from "components/add-note/input-form/labels-list/labelList.style";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addLabel } from "store";
import { useSelector } from "react-redux";
import { labelPropType } from "utils/constants/prop-types.constant";
// import { handleBlur } from "utils/constants/refs.constant";

const LabelsList = ({
  anchor,
  hideLabels,
  addLabelChip,
  labels,
  labelTerm,
  // forwardedref,
  // handleBlur,
}) => {
  // const wrapperRef = useRef(null);
  // handleBlur(wrapperRef);

  // useEffect(() => {
  //   handleBlur(forwardedref);
  // }, [forwardedref]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.user.userId);

  return (
    <Popover
      // ref={forwardedref}
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
        <Divider />
        <ListItem
          button
          sx={{ ...style.listItem }}
          onClick={async () => {
            if (labelTerm) {
              const label = await dispatch(
                addLabel({ userId: userId, label: labelTerm })
              );
              addLabelChip(label.payload.id, label.payload.name);
            }
            hideLabels();
          }}
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

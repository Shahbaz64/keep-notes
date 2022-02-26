import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Button,
  IconButton,
  DialogActions,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { style, useStyles } from "components/label-dialog/labelDialog.style";
import EditLabels from "components/label-dialog/edit-labels/editLabels";
import { labelPropType } from "utils/constants/prop-types.constant";

const LabelDialog = ({ open, handleClose, handleLabelAdd, labels }) => {
  const [labelName, setLabelName] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();

  const addLabelHandler = () => {
    if (labelName) {
      const labelNames = labels.map((label) => label.name);
      if (labelNames.includes(labelName)) {
        setError("Label already Exists");
        setLabelName("");
      } else {
        handleLabelAdd(labelName);
        setLabelName("");
        setError("");
      }
    }
  };

  return (
    <Dialog
      open={open}
      className={classes.dialogContent}
      onClose={() => {
        handleClose();
        setError("");
      }}
    >
      <DialogTitle>
        <Typography variant="body1"> Edit labels</Typography>
      </DialogTitle>
      <DialogContent>
        <div>
          <IconButton>
            <CloseIcon fontSize="small" />
          </IconButton>
          <TextField
            autoFocus
            variant="standard"
            placeholder="Create new label"
            value={labelName}
            sx={{ ...style.input }}
            onChange={(event) => {
              setLabelName(event.target.value);
              setError("");
            }}
          />
          <IconButton onClick={addLabelHandler}>
            <DoneIcon fontSize="small" />
          </IconButton>
        </div>
        {error && (
          <Typography color="error" sx={{ ...style.error }}>
            {error}
          </Typography>
        )}
        <EditLabels labels={labels} />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          variant="text"
          color="inherit"
          onClick={() => {
            addLabelHandler();
            handleClose();
            setError("");
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LabelDialog.propTypes = {
  open: PropTypes.bool,
  handleLabelAdd: PropTypes.func.isRequired,
  labels: labelPropType,
  handleClose: PropTypes.func,
};

LabelDialog.defaultProps = {
  open: false,
  labels: [],
  handleClose: () => {},
};

export default LabelDialog;

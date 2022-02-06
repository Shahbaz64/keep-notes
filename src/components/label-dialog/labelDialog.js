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
import { useDispatch } from "react-redux";
import { hideLabelDialog } from "store";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditLabels from "components/label-dialog/edit-labels/editLabels";
import { style } from "components/label-dialog/labelDialog.style";

const LabelDialog = ({ open, handleLabelAdd, labels }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");

  const handleClose = () => {
    dispatch(hideLabelDialog());
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="body1"> Edit labels</Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <IconButton>
              <CloseIcon fontSize="small" />
            </IconButton>
            <TextField
              sx={{ ...style.input }}
              variant="standard"
              placeholder="Create new label"
              autoFocus
              value={label}
              onChange={(event) => {
                setLabel(event.target.value);
              }}
            />
            <IconButton
              onClick={() => {
                if (label) {
                  handleLabelAdd(label);
                  setLabel("");
                }
              }}
            >
              <DoneIcon fontSize="small" />
            </IconButton>
          </div>
          <EditLabels labels={labels} />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              if (label) {
                handleLabelAdd(label);
                setLabel("");
                dispatch(hideLabelDialog());
              } else {
                dispatch(hideLabelDialog());
              }
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LabelDialog.propTypes = {
  open: PropTypes.bool,
  handleLabelAdd: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

LabelDialog.defaultProps = {
  open: false,
  labels: [],
};

export default LabelDialog;

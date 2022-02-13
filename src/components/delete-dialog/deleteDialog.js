import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteAllNotes, hideDeleteDialog } from "store";
import PropTypes from "prop-types";
import { style } from "components/delete-dialog/deleteDialog.style";

const DeleteDialog = ({ open, title, btnText }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideDeleteDialog());
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>
          <Typography variant="body1">{title}</Typography>
        </DialogTitle>
        <DialogActions>
          <Button color="inherit" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            color="inherit"
            sx={{ ...style.btn }}
            onClick={() => {
              dispatch(deleteAllNotes());
              handleClose();
            }}
          >
            {btnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string,
};

DeleteDialog.defaultProps = {
  open: false,
  delBtn: "Delete",
};

export default DeleteDialog;

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import HELPER from "utils/helpers/notes.helper";
import { useDispatch, useSelector } from "react-redux";
import { hideDeleteDialog } from "store";
import PropTypes from "prop-types";
import { style } from "components/delete-dialog/deleteDialog.style";

const DeleteDialog = ({ open, title, btnText }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notes = useSelector((state) => state.notesReducer.notes);

  const handleClose = () => {
    dispatch(hideDeleteDialog());
  };

  const handleDeleteAllNotes = () => {
    notes.map((note) => {
      if (note.isDeleted === true) {
        HELPER.DELETEALLNOTES(userId, note.id);
      }
    });
    handleClose();
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
            onClick={handleDeleteAllNotes}
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

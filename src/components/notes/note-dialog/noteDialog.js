import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNoteDialog, updateNoteColor, deleteNote, updateNote } from "store";
import { TextField, IconButton, Button, Tooltip } from "@mui/material";
import { useStyles } from "components/notes/note-dialog/noteDialog.style";
import PaletteIcon from "@mui/icons-material/Palette";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";

const validationSchema = yup.object({
  title: yup.string(),
  text: yup.string(),
});

const NoteDialog = ({ open, note }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.toggleReducer.mode);
  const [colorAnchor, setColorAnchor] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: note.title,
      text: note.text,
    },
    onSubmit: (values) => {
      if (!values.title || !values.text) {
        handleClose();
      } else {
        dispatch(
          updateNote({
            noteId: note.id,
            title: values.title,
            text: values.text,
          })
        );
        handleClose();
      }
    },
    validationSchema: validationSchema,
  });

  const handleClose = () => {
    dispatch(hideNoteDialog());
    formik.values.title = note.title;
    formik.values.text = note.text;
  };

  const showColorPallete = (event) => {
    setColorAnchor(event.currentTarget);
  };

  const hideColorPallete = () => {
    setColorAnchor(null);
  };

  const updateColor = (lightColor, darkColor, noteId) => {
    setColorAnchor(null);
    dispatch(
      updateNoteColor({
        noteId: noteId,
        color: { lightColor: lightColor, darkColor: darkColor },
      })
    );
  };

  const deleteNoteHandler = (noteId) => {
    dispatch(deleteNote(noteId));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        className={classes.dialog}
      >
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          style={{
            backgroundColor: `${
              mode ? note.color.darkColor : note.color.lightColor
            }`,
          }}
        >
          <TextField
            name="title"
            variant="standard"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: 18, fontWeight: "400" },
            }}
          />
          <TextField
            name="text"
            multiline
            variant="standard"
            placeholder="Take a Note..."
            value={formik.values.text}
            onChange={formik.handleChange}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <div className={classes.actions}>
            <div>
              <Tooltip title="Background Options">
                <IconButton onClick={showColorPallete}>
                  <PaletteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <ColorPallete
                anchor={colorAnchor}
                hideColorPallete={hideColorPallete}
                getColor={updateColor}
                noteId={note.id}
              />
              <Tooltip title="Delete Note">
                <IconButton
                  onClick={() => deleteNoteHandler({ noteId: note.id })}
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <Button type="submit" variant="text" color="inherit">
              Close
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

NoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  note: PropTypes.object.isRequired,
};

export default NoteDialog;

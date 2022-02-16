import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { hideNoteDialog, deleteNote, updateNote } from "store";
import PaletteIcon from "@mui/icons-material/Palette";
import { useDispatch, useSelector } from "react-redux";
import { TextField, IconButton, Button, Tooltip } from "@mui/material";
import { useStyles } from "components/notes/note-dialog/noteDialog.style";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import LabelsList from "components/add-note/input-form/labels-list/labelsList";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";

const validationSchema = yup.object({
  title: yup.string(),
  text: yup.string(),
  color: yup.object(),
  labels: yup.array(),
});

const NoteDialog = ({ open, note }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.toggleReducer.mode);
  const [colorAnchor, setColorAnchor] = useState(null);
  const [labelAnchor, setLabelAnchor] = useState(null);
  const labels = useSelector((state) => state.notesReducer.labels);
  const [labelChips, setLabelChips] = useState(note.labels);

  const formik = useFormik({
    initialValues: {
      title: note.title,
      text: note.text,
      color: {
        lightColor: note.color.lightColor,
        darkColor: note.color.darkColor,
      },
      labelChips: labelChips,
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
            color: values.color,
            labels: values.labelChips,
          })
        );
        handleClose();
      }
    },
    validationSchema: validationSchema,
  });

  const removeChip = (labelId) => {
    formik.values.labelChips = formik.values.labelChips.filter(
      (label) => label.id !== labelId
    );
    setLabelChips(formik.values.labelChips);
  };

  const addLabelChip = (id, name, notes) => {
    formik.values.labelChips = [
      ...formik.values.labelChips,
      { id: id, name: name, notes: notes },
    ];
  };

  const showLabels = (event) => {
    setLabelAnchor(event.currentTarget);
  };

  const hideLabels = () => {
    setLabelAnchor(null);
  };

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

  const getColor = (lightColor, darkColor) => {
    formik.values.color = { lightColor: lightColor, darkColor: darkColor };
    setColorAnchor(null);
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
              mode
                ? formik.values.color.darkColor
                : formik.values.color.lightColor
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
            onKeyDown={(event) => {
              if (event.key === "#") {
                showLabels(event);
              } else {
                setLabelAnchor(null);
              }
            }}
          />
          <LabelsList
            anchor={labelAnchor}
            hideLabels={hideLabels}
            addLabelChip={addLabelChip}
            labels={labels}
          />
          <LabelChips
            chips={formik.values.labelChips}
            removeLabelChip={removeChip}
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
                getColor={getColor}
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

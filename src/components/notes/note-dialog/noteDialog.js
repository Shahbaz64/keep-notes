import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { hideNoteDialog, deleteNote } from "store";
import PaletteIcon from "@mui/icons-material/Palette";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "utils/schema/schema";
import { TextField, IconButton, Button, Tooltip } from "@mui/material";
import { useStyles } from "components/notes/note-dialog/noteDialog.style";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import LabelsList from "components/add-note/input-form/labels-list/labelsList";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";
import HELPER from "utils/helpers/notes.helper";

const NoteDialog = ({ open, note }) => {
  // console.log(note.id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [labelTerm, setLabelTerm] = useState("");
  const [colorAnchor, setColorAnchor] = useState(null);
  const [labelAnchor, setLabelAnchor] = useState(null);
  const [labelChips, setLabelChips] = useState(note.labels);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const labels = useSelector((state) => state.notesReducer.labels);
  const userId = useSelector((state) => state.authReducer.user.userId);

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
      const newNote = {
        title: values.title,
        text: values.text,
        color: values.color,
        labels: values.labelChips?.map((label) => {
          return { id: label.id, name: label.name };
        }),
      };
      HELPER.UPDATENOTE(userId, note.id, newNote);

      // dispatch(
      //   updateNote({
      //     userId: userId,
      //     noteId: note.id,
      //     title: values.title,
      //     text: values.text,
      //     color: values.color,
      //     labels: values.labelChips,
      //   })
      // );
      handleClose();
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

  const handleKeyUp = (e) => {
    const label = e.target.value.substring(e.target.value.lastIndexOf("#") + 1);
    setLabelTerm(label);
    if (e.key === "#") {
      showLabels(e);
    } else if (e.key === " ") {
      setLabelAnchor(null);
    }
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
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: 18, fontWeight: "400" },
            }}
          />
          <TextField
            name="text"
            multiline
            variant="standard"
            placeholder="Take a note..."
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
            }}
            onKeyUp={handleKeyUp}
          />
          <LabelsList
            anchor={labelAnchor}
            hideLabels={hideLabels}
            addLabelChip={addLabelChip}
            labels={labels}
            labelTerm={labelTerm}
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
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    color: PropTypes.shape({
      lightColor: PropTypes.string,
      darkColor: PropTypes.string,
    }),
  }),
};

export default NoteDialog;

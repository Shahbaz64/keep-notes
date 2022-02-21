import React from "react";
import { Typography } from "@mui/material";
import { addNote } from "store";
import { useParams } from "react-router-dom";
import { useStyles } from "views/labels/Label.style";
import { useSelector, useDispatch } from "react-redux";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

const Label = () => {
  const { labelName } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesReducer.notes);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const labelNotes = [];
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );

  notes.map((note) => {
    note.labels?.map((label) => {
      if (label.name === labelName && note.isDeleted === false) {
        labelNotes.push(note);
      }
    });
  });

  const addNotesHandler = (title, text, color, isDeleted, labels) => {
    dispatch(addNote({ userId, title, text, color, isDeleted, labels }));
  };

  return (
    <div
      className={isOpenDrawer ? classes.shiftTextRight : classes.shiftTextLeft}
    >
      {isOpenInputBar ? (
        <InputBar />
      ) : (
        <InputForm handleAddNote={addNotesHandler} />
      )}
      {labelNotes.length ? (
        <div className={classes.notes}>
          {toggleView ? (
            <NotesList notes={labelNotes} />
          ) : (
            <NotesGrid notes={labelNotes} />
          )}
        </div>
      ) : (
        <div className={classes.center}>
          <LabelOutlinedIcon sx={{ fontSize: 80 }} />
          <Typography variant="h6" color="inherit">
            No notes with this label yet.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Label;

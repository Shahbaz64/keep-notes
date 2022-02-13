import React from "react";
import { nanoid } from "nanoid";
import { addNote } from "store";
import { useParams } from "react-router-dom";
import { useStyles } from "views/labels/Label.style";
import { useSelector, useDispatch } from "react-redux";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";

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

  const addNotesHandler = (title, text, color, labels) => {
    dispatch(addNote({ userId, title, text, color, labels }));
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
      <div className={classes.notes}>
        {notes.map((note) => {
          note.labels.map((label) => {
            if (label.name === labelName) {
              labelNotes.push(note);
            }
          });
        })}
        {toggleView ? (
          <NotesList key={nanoid()} notes={labelNotes} />
        ) : (
          <NotesGrid key={nanoid()} notes={labelNotes} />
        )}
      </div>
    </div>
  );
};

export default Label;

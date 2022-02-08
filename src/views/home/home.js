import React from "react";
import { useStyles } from "views/home/home.style";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "components/snackbar/snackBar";
import ProgressBar from "components/progress-bar/progressBar";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";
import { addNote } from "store";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesReducer.notes);
  const userId = useSelector((state) => state.notesReducer.userId);
  const isError = useSelector((state) => state.notesReducer.isError);
  const errorMsg = useSelector((state) => state.notesReducer.errorMsg);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );

  const addNotesHandler = (title, text, color, labels) => {
    dispatch(addNote({ userId, title, text, color, labels }));
  };

  if (isError) {
    return <SnackBar msg={errorMsg} />;
  }

  return (
    <div>
      {notesLoading ? (
        <ProgressBar />
      ) : (
        <div
          className={
            isOpenDrawer ? classes.shiftTextRight : classes.shiftTextLeft
          }
        >
          {isOpenInputBar ? (
            <InputBar />
          ) : (
            <InputForm handleAddNote={addNotesHandler} />
          )}
          <div className={classes.allNotes}>
            {toggleView ? (
              <NotesList notes={notes} />
            ) : (
              <NotesGrid notes={notes} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

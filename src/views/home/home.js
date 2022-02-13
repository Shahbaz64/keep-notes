import React from "react";
import { addNote } from "store";
import { useStyles } from "views/home/home.style";
import SnackBar from "components/snackbar/snackBar";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "components/progress-bar/progressBar";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesReducer.notes);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const { isError, errorMsg } = useSelector(
    (state) => state.notesReducer.error
  );
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
          <div className={classes.notes}>
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

import React from "react";
import { useStyles } from "views/home/home.style";
import { useSelector } from "react-redux";
import SnackBar from "components/snackbar/snackBar";
import ProgressBar from "components/progress-bar/progressBar";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";

const Home = () => {
  const classes = useStyles();
  const notes = useSelector((state) => state.notesReducer.notes);
  const isError = useSelector((state) => state.notesReducer.isError);
  const errorMsg = useSelector((state) => state.notesReducer.errorMsg);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);

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

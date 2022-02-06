import React from "react";
import AppBar from "components/appbar/appbar";
import Drawer from "components/drawer/drawer";
import { useStyles } from "views/home/home.style";
import SnackBar from "components/snackbar/snackBar";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "components/progress-bar/progressBar";
import LabelDialog from "components/label-dialog/labelDialog";
import InputBar from "components/add-note/input-bar/inputBar";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";
import InputForm from "components/add-note/input-form/inputForm";
import { addNote, addLabel, signOutUser, showLabelDialog } from "store";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.notesReducer.userId);
  const notes = useSelector((state) => state.notesReducer.notes);
  const labels = useSelector((state) => state.notesReducer.labels);
  const isError = useSelector((state) => state.notesReducer.isError);
  const errorMsg = useSelector((state) => state.notesReducer.errorMsg);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const isOpenLabelDialog = useSelector(
    (state) => state.toggleReducer.isOpenLabelDialog
  );
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );

  const signOutHandler = () => {
    dispatch(signOutUser());
  };

  const addNotesHandler = (title, text, color, labels) => {
    dispatch(addNote({ userId, title, text, color, labels }));
  };

  const openDialogHandler = () => {
    dispatch(showLabelDialog());
  };

  const addLabelHandler = (label) => {
    dispatch(addLabel({ userId, label }));
  };

  if (isError) {
    return <SnackBar msg={errorMsg} />;
  }

  return (
    <div>
      {notesLoading ? (
        <ProgressBar />
      ) : (
        <div className={classes.body}>
          <AppBar handleSignOut={signOutHandler} />
          <Drawer handleDialog={openDialogHandler} labels={labels} />
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
              <LabelDialog
                open={isOpenLabelDialog}
                labels={labels}
                handleLabelAdd={addLabelHandler}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

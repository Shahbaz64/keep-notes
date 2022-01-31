import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "components/appbar/appbar";
import Drawer from "components/drawer/drawer";
import Note from "components/note/note";
import Masonry from "react-masonry-css";
import { useStyles } from "views/home/home.style";
import ProgressBar from "components/progress-bar/progressBar";
import { addNote, addLabel, signOutUser, showDialog } from "store";
import { getAllLabels, getAllNotes } from "database/config-firebase";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";
import SnackBar from "components/snackbar/snackBar";
import LabelDialog from "components/label-dialog/labelDialog";
import { nanoid } from "nanoid";

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.authReducer.user.uid);
  const notes = useSelector((state) => state.notesReducer.notes);
  const labels = useSelector((state) => state.notesReducer.labels);
  const isError = useSelector((state) => state.notesReducer.isError);
  const errorMsg = useSelector((state) => state.notesReducer.errorMsg);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const isloggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const isOpenDialog = useSelector((state) => state.toggleReducer.isOpenDialog);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );

  const breakPoint = {
    default: 6,
    1250: 5,
    1100: 4,
    900: 3,
    700: 2,
    450: 1,
  };

  const signOutHandler = () => {
    dispatch(signOutUser());
  };

  const addNotesHandler = (title, text, color) => {
    dispatch(addNote({ title, text, color }));
  };

  const openDialogHandler = () => {
    dispatch(showDialog());
  };

  const addLabelHandler = (label) => {
    dispatch(addLabel(label));
  };

  useEffect(() => {
    dispatch(getAllNotes(uid));
    dispatch(getAllLabels(uid));
  }, []);

  return (
    <div>
      {!isloggedIn ? (
        <Navigate to="/" />
      ) : notesLoading ? (
        <ProgressBar />
      ) : isError ? (
        <SnackBar msg={errorMsg} />
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
              <Masonry
                breakpointCols={breakPoint}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {notes.map((note) => (
                  <Note
                    key={nanoid()}
                    title={note.title}
                    text={note.text}
                    color={note.color}
                  />
                ))}
              </Masonry>
              <LabelDialog
                open={isOpenDialog}
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

export default HomePage;

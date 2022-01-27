import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import AppBar from "components/appbar/appbar";
import Drawer from "components/drawer/drawer";
import Note from "components/note/note";
import Masonry from "react-masonry-css";
import { useStyles } from "views/home/home.style";
import ProgressBar from "components/progress-bar/progressBar";
import { addNote } from "store";
import { getAllNotes } from "database/config-firebase";
import { useEffect } from "react";
import { signOutUser } from "store";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";
import SnackBar from "components/snackbar/snackBar";

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const uid = useSelector((state) => state.authReducer.user.uid);
  const notes = useSelector((state) => state.notesReducer.notes);
  const isError = useSelector((state) => state.notesReducer.isError);
  const errorMsg = useSelector((state) => state.notesReducer.errorMsg);
  const isloggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );
  // console.log(isloggedIn);

  const breakPoint = {
    default: 5,
    1250: 4,
    1100: 3,
    800: 2,
    500: 1,
  };

  const signOutHandler = () => {
    dispatch(signOutUser());
  };

  const addNotesHandler = async (title, text) => {
    dispatch(addNote({ title, text }));
  };

  useEffect(() => {
    console.log(uid);
    dispatch(getAllNotes(uid));
    console.log(notes);
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
          <Drawer />
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
                  <div key={note.id}>
                    <Note title={note.title} text={note.text} />
                  </div>
                ))}
              </Masonry>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

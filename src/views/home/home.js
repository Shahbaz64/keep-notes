import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useStyles } from "views/home/home.style";
import { useSelector, useDispatch } from "react-redux";
import { addNote, addLabel, signOutUser, showDialog } from "store";
import Masonry from "react-masonry-css";
import Note from "components/note/note";
import AppBar from "components/appbar/appbar";
import Drawer from "components/drawer/drawer";
import SnackBar from "components/snackbar/snackBar";
import ProgressBar from "components/progress-bar/progressBar";
import LabelDialog from "components/label-dialog/labelDialog";
import InputBar from "components/add-note/input-bar/inputBar";
import InputForm from "components/add-note/input-form/inputForm";

const Home = ({ authorized }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.user.uid);
  const notes = useSelector((state) => state.notesReducer.notes);
  const labels = useSelector((state) => state.notesReducer.labels);
  const isError = useSelector((state) => state.notesReducer.isError);
  const errorMsg = useSelector((state) => state.notesReducer.errorMsg);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const isOpenDialog = useSelector((state) => state.toggleReducer.isOpenDialog);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const isOpenInputBar = useSelector(
    (state) => state.toggleReducer.isOpenInputBar
  );

  const breakPoint = {
    default: 5,
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
    dispatch(addNote({ userId, title, text, color }));
  };

  const openDialogHandler = () => {
    dispatch(showDialog());
  };

  const addLabelHandler = (label) => {
    dispatch(addLabel({ userId, label }));
  };

  if (!authorized) {
    return <Navigate to="/" />;
  }
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
              <Masonry
                breakpointCols={breakPoint}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {notes.map((note) => (
                  <Note
                    key={note.id}
                    text={note.text}
                    color={note.color}
                    title={note.title}
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

Home.propTypes = {
  authorized: PropTypes.bool.isRequired,
};

export default Home;

import React from "react";
import { addNote } from "store";
import { useStyles } from "views/home/home.style";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "components/progress-bar/progressBar";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";
import InputForm from "components/add-note/inputForm";
import { Typography } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notesLoading = useSelector((state) => state.notesReducer.loading);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const classes = useStyles({ isOpenDrawer });

  const notes = useSelector((state) =>
    state.notesReducer.notes.filter((note) => {
      return note.isDeleted != true;
    })
  );

  const addNotesHandler = (title, text, color, isDeleted, labels) => {
    dispatch(addNote({ userId, title, text, color, isDeleted, labels }));
  };

  if (notesLoading) {
    return <ProgressBar />;
  }

  return (
    <div
      className={
        isOpenDrawer ? classes.shiftContentRight : classes.shiftContentLeft
      }
    >
      <InputForm handleAddNote={addNotesHandler} />
      {notes.length ? (
        <div className={classes.notes}>
          {toggleView ? (
            <NotesList notes={notes} />
          ) : (
            <NotesGrid notes={notes} />
          )}
        </div>
      ) : (
        <div className={classes.center}>
          <LightbulbOutlinedIcon sx={{ fontSize: 80 }} />
          <Typography variant="h6" color="inherit">
            Notes you add appear here
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Home;

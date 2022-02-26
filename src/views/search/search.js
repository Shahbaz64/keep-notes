import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "views/search/search.style";
import NotesGrid from "components/notes/notes-grid/notesGrid";
import NotesList from "components/notes/notes-list/notesList";

const Search = () => {
  const searchTerm = useSelector((state) => state.notesReducer.searchTerm);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);

  const classes = useStyles();
  const notes = useSelector((state) =>
    state.notesReducer.notes.filter((note) => {
      return note.isDeleted != true;
    })
  );
  const filteredNotes = notes.filter((note) => {
    if (searchTerm) {
      return note.title.includes(searchTerm) || note.text.includes(searchTerm);
    }
  });

  return (
    <div
      className={
        isOpenDrawer ? classes.shiftContentRight : classes.shiftContentLeft
      }
    >
      <div className={classes.header}>
        {toggleView ? (
          <div className={classes.notesList}>
            <NotesList notes={filteredNotes} />
          </div>
        ) : (
          <div className={classes.notesGrid}>
            <NotesGrid notes={filteredNotes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

import PropTypes from "prop-types";
import React from "react";
import { useStyles } from "components/notes/notes-list/notesList.style";
import NoteCard from "../note-card/noteCard";

const NotesList = ({ notes }) => {
  const classes = useStyles();

  return (
    <div className={classes.notesList}>
      {notes.map((note, index) => (
        <NoteCard key={note.id} note={note} index={index} />
      ))}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesList;

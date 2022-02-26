import React from "react";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import NoteCard from "components/notes/note-card/noteCard";

const NotesGrid = ({ notes }) => {
  const breakPoints = {
    default: 5,
    1250: 5,
    1150: 4,
    920: 3,
    700: 2,
    500: 1,
  };
  return (
    <Masonry
      breakpointCols={breakPoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {notes?.map((note, index) => {
        return <NoteCard key={note.id} note={note} index={index} />;
      })}
    </Masonry>
  );
};

NotesGrid.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesGrid;

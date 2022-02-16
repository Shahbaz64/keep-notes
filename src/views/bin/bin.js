import React from "react";
import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux";
import { useStyles, style } from "views/bin/bin.style";
import { Button, Typography } from "@mui/material";
import NoteCard from "views/bin/note-card/noteCard";
import DeleteDialog from "components/delete-dialog/deleteDialog";
import { showDeleteDialog } from "store";

const Bin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deletedNotes = useSelector((state) => state.notesReducer.deletedNotes);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDeleteDialog = useSelector(
    (state) => state.toggleReducer.isOpenDeleteDialog
  );

  const breakPoint = {
    default: 5,
    1250: 5,
    1100: 4,
    900: 3,
    700: 2,
    450: 1,
  };

  return (
    <div
      className={isOpenDrawer ? classes.shiftTextRight : classes.shiftTextLeft}
    >
      <div className={classes.header}>
        <Typography fontStyle="italic">
          Notes in the Bin will be deleted
        </Typography>
        {!(deletedNotes.length === 0) ? (
          <Button
            color="inherit"
            sx={{ ...style.btn }}
            onClick={() => dispatch(showDeleteDialog())}
          >
            Empty Bin
          </Button>
        ) : null}
      </div>
      <div className={classes.notesGrid}>
        {toggleView ? (
          <div className={classes.notesList}>
            {deletedNotes?.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        ) : (
          <Masonry
            breakpointCols={breakPoint}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {deletedNotes?.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </Masonry>
        )}
      </div>
      <DeleteDialog
        open={isOpenDeleteDialog}
        title="Empty bin? All notes in Recycle Bin will be permanently deleted."
        btnText="Empty Bin"
      />
    </div>
  );
};

export default Bin;

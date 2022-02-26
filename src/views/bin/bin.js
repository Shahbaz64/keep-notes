import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import { useStyles, style } from "views/bin/bin.style";
import { Button, Typography } from "@mui/material";
import NoteCard from "views/bin/note-card/noteCard";
import DeleteDialog from "components/delete-dialog/deleteDialog";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Bin = () => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const notes = useSelector((state) =>
    state.notesReducer.notes.filter((note) => {
      return note.isDeleted === true;
    })
  );
  const toggleView = useSelector((state) => state.toggleReducer.toggleView);
  const isOpenDrawer = useSelector((state) => state.toggleReducer.isOpenDrawer);
  const isOpenIconBar = useSelector(
    (state) => state.toggleReducer.isOpenIconBar
  );
  const classes = useStyles({ isOpenDrawer, isOpenIconBar });

  let isAnyDeletedNote = false;
  notes.map((note) => {
    if (note.isDeleted) {
      isAnyDeletedNote = true;
    }
  });

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const breakPoints = {
    default: 5,
    1250: 5,
    1150: 4,
    920: 3,
    700: 2,
    500: 1,
  };

  return (
    <div
      className={
        isOpenDrawer ? classes.shiftContentRight : classes.shiftContentLeft
      }
    >
      <div className={classes.header}>
        <Typography fontStyle="italic">
          Notes in the Bin will be deleted
        </Typography>
        {isAnyDeletedNote && (
          <Button
            className={classes.emptyButton}
            variant="text"
            color="info"
            sx={{ ...style.emptyButton }}
            onClick={() => setIsOpenDeleteDialog(true)}
          >
            Empty Bin
          </Button>
        )}
      </div>
      {notes.length ? (
        <div>
          <div className={classes.notesGrid}>
            {toggleView ? (
              <div className={classes.notesList}>
                {notes?.map((note, index) => {
                  return <NoteCard key={note.id} note={note} index={index} />;
                })}
              </div>
            ) : (
              <Masonry
                breakpointCols={breakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {notes?.map((note, index) => {
                  return <NoteCard key={note.id} note={note} index={index} />;
                })}
              </Masonry>
            )}
          </div>
          <DeleteDialog
            open={isOpenDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            title="Empty bin? All notes in Recycle Bin will be permanently deleted."
            btnText="Empty Bin"
          />
        </div>
      ) : (
        <div className={classes.center}>
          <DeleteOutlinedIcon sx={{ fontSize: 80 }} />
          <Typography variant="h6" color="inherit">
            No notes in Recycle Bin
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Bin;

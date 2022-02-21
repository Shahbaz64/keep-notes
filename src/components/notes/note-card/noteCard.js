import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useStyles, style } from "components/notes/note-card/noteCard.style";
import Actions from "components/notes/actions/actions";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import NoteDialog from "components/notes/note-dialog/noteDialog";
import HELPER from "utils/helpers/notes.helper";
import { notePropType } from "utils/constants/prop-types.constant";

const NoteCard = ({ note, index }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(-1);
  const [isOpenNoteDialog, setIsOpenNoteDialog] = useState(false);
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notes = useSelector((state) => state.notesReducer.notes);

  const handleCloseNoteDialog = () => {
    setIsOpenNoteDialog(false);
  };

  const removeLabelChip = (labelId, noteId) => {
    notes.map((note) => {
      if (note.id === noteId) {
        const newLabels = note.labels.filter((label) => label.id !== labelId);
        HELPER.DELETELABELFROMNOTE(userId, labelId, note.id, newLabels);
      }
    });
  };

  return (
    <div>
      <Card
        variant={isHovered === index ? "elevation" : "outlined"}
        elevation={isHovered === index ? 4 : 0}
        className={classes.noteCard}
        sx={{
          ...style.card,
          backgroundColor: `${
            darkMode ? note.color.darkColor : note.color.lightColor
          }`,
        }}
        onMouseEnter={() => {
          setIsHovered(index);
        }}
        onMouseLeave={() => setIsHovered(-1)}
      >
        <div
          onClick={() => {
            setIsOpenNoteDialog(true);
          }}
        >
          <CardHeader
            title={note.title}
            sx={{ ...style.header }}
            titleTypographyProps={{ variant: "subtitle2" }}
          />
          <CardContent className={classes.innerText}>
            <Typography variant="body2">{note.text} </Typography>
            <LabelChips
              chips={note.labels}
              removeLabelChip={removeLabelChip}
              noteId={note.id}
            />
          </CardContent>
        </div>
        {isHovered === index && (
          <div>
            <Actions noteId={note.id} />
            <NoteDialog
              open={isOpenNoteDialog}
              handleCloseNoteDialog={handleCloseNoteDialog}
              note={note}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

NoteCard.propTypes = {
  note: notePropType,
  index: PropTypes.number.isRequired,
};

export default NoteCard;

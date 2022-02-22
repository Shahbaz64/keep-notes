import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import HELPER from "utils/helpers/notes.helper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useStyles, style } from "views/bin/note-card/noteCard.style";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import { notePropType } from "utils/constants/prop-types.constant";

const NoteCard = ({ note, index }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(-1);
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notes = useSelector((state) => state.notesReducer.notes);

  const handleDeleteNoteForever = (noteId) => {
    HELPER.DELETENOTEFOREVER(userId, noteId);
  };

  const handleRestoreNote = (noteId) => {
    notes.map((note) => {
      if (note.id === noteId) {
        HELPER.RESTORENOTE(userId, noteId);
      }
    });
  };

  return (
    <Card
      key={note.id}
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
      <CardHeader
        title={note.title}
        sx={{ ...style.header }}
        titleTypographyProps={{ variant: "subtitle2" }}
      />
      <CardContent className={classes.innerText}>
        <Typography variant="body2">{note.text} </Typography>
        <LabelChips chips={note.labels} />
      </CardContent>
      {isHovered === index ? (
        <div className={classes.actions}>
          <Tooltip title="Delete forever">
            <IconButton
              onClick={() => {
                handleDeleteNoteForever(note.id);
              }}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore">
            <IconButton
              onClick={() => {
                handleRestoreNote(note.id);
              }}
            >
              <RestoreFromTrashIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
    </Card>
  );
};

NoteCard.propTypes = {
  index: PropTypes.number.isRequired,
  note: notePropType,
};

export default NoteCard;

import PropTypes from "prop-types";
import { showNoteDialog } from "store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useStyles, style } from "components/notes/note-card/noteCard.style";
import Actions from "components/notes/actions/actions";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import { deleteLabelsFromNote } from "store";

const NoteCard = ({ note, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(-1);
  const mode = useSelector((state) => state.toggleReducer.mode);

  const removeLabelChip = (labelId, noteId) => {
    dispatch(deleteLabelsFromNote({ labelId: labelId, noteId: noteId }));
  };

  return (
    <Card
      variant={isHovered === index ? "elevation" : "outlined"}
      elevation={isHovered === index ? 4 : 0}
      className={classes.noteCard}
      sx={{
        ...style.card,
        backgroundColor: `${
          mode ? note.color.darkColor : note.color.lightColor
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
        onClick={() => {
          dispatch(showNoteDialog());
        }}
      />
      <CardContent
        className={classes.innerText}
        onClick={() => {
          dispatch(showNoteDialog());
        }}
      >
        <Typography variant="body2">{note.text} </Typography>
        <LabelChips
          chips={note.labels}
          removeLabelChip={removeLabelChip}
          noteId={note.id}
        />
      </CardContent>
      {isHovered === index ? <Actions note={note} /> : null}
    </Card>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default NoteCard;

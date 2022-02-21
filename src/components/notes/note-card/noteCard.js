import PropTypes from "prop-types";
import { showNoteDialog } from "store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useStyles, style } from "components/notes/note-card/noteCard.style";
import Actions from "components/notes/actions/actions";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import NoteDialog from "components/notes/note-dialog/noteDialog";
import HELPER from "utils/helpers/notes.helper";

const NoteCard = ({ note, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(-1);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notes = useSelector((state) => state.notesReducer.notes);
  const isOpenNoteDialog = useSelector(
    (state) => state.toggleReducer.isOpenNoteDialog
  );

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
            mode ? note.color.darkColor : note.color.lightColor
          }`,
        }}
        onMouseEnter={() => {
          setIsHovered(index);
        }}
        onMouseLeave={() => setIsHovered(-1)}
      >
        <div
          onClick={() => {
            dispatch(showNoteDialog());
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
            <NoteDialog open={isOpenNoteDialog} note={note} />
          </div>
        )}
      </Card>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    color: PropTypes.shape({
      lightColor: PropTypes.string,
      darkColor: PropTypes.string,
    }),
  }),
  index: PropTypes.number.isRequired,
};

export default NoteCard;

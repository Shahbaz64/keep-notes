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
import { useStyles, style } from "views/bin/note-card/noteCard.style";
import { useSelector, useDispatch } from "react-redux";
import { deleteNoteForever } from "store";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { restoreNote } from "store";

const NoteCard = ({ note, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(-1);
  const mode = useSelector((state) => state.toggleReducer.mode);
  return (
    <Card
      key={note.id}
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
                dispatch(deleteNoteForever(note.id));
              }}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore">
            <IconButton
              onClick={() => {
                dispatch(restoreNote({ noteId: note.id, labels: note.labels }));
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
  note: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default NoteCard;

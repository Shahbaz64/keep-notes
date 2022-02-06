import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Card,
} from "@mui/material";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { useStyles, style } from "components/notes/notes-list/notesList.style";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "store";

const NotesList = ({ notes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(-1);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const deleteNoteHandler = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  return (
    <div>
      {notes.map((note, index) => (
        <Card
          key={note.id}
          variant={isHovered === index ? "elevation" : "outlined"}
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
              <Tooltip title="Background Options">
                <IconButton sx={{ ...style.icons }}>
                  <PaletteOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Note">
                <IconButton
                  sx={{ ...style.icons }}
                  onClick={() => deleteNoteHandler({ noteId: note.id })}
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesList;

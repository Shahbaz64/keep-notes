import React from "react";
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
import { useDispatch } from "react-redux";
import { deleteNote } from "store";

const NotesList = ({ notes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteNoteHandler = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  return (
    <div>
      {notes.map((note) => (
        <Card
          key={note.id}
          variant="outlined"
          sx={{ ...style.card, backgroundColor: `${note.color}` }}
          className={classes.noteCard}
        >
          <CardHeader
            title={note.title}
            sx={{ ...style.header }}
            titleTypographyProps={{ variant: "subtitle2" }}
          />
          <CardContent className={classes.innerText}>
            <Typography variant="body2">{note.text} </Typography>
          </CardContent>
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
        </Card>
      ))}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesList;

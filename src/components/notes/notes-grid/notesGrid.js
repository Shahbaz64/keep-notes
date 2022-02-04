import React from "react";
import Masonry from "react-masonry-css";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { useStyles, style } from "components/notes/notes-grid/notesGrid.style";
import { useDispatch, useSelector } from "react-redux";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteNote } from "store";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";

const NotesGrid = ({ notes }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const mode = useSelector((state) => state.toggleReducer.mode);

  const deleteNoteHandler = (noteId) => {
    dispatch(deleteNote(noteId));
  };
  const breakPoint = {
    default: 5,
    1250: 5,
    1100: 4,
    900: 3,
    700: 2,
    450: 1,
  };
  return (
    <Masonry
      breakpointCols={breakPoint}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((note) => (
        <Card
          key={note.id}
          variant="outlined"
          className={classes.noteCard}
          sx={{ ...style.card }}
        >
          <div
            style={{
              backgroundColor: `${
                mode ? note.color.darkColor : note.color.lightColor
              }`,
            }}
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
          </div>
        </Card>
      ))}
    </Masonry>
  );
};

NotesGrid.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesGrid;

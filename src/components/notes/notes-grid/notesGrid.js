import React, { useState } from "react";
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
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";
import {
  showNoteDialog,
  deleteNote,
  updateNoteColor,
  deleteLabelsFromNote,
} from "store";
import NoteDialog from "components/notes/note-dialog/noteDialog";

const NotesGrid = ({ notes }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(-1);
  const [colorAnchor, setColorAnchor] = useState(null);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const isOpenNoteDialog = useSelector(
    (state) => state.toggleReducer.isOpenNoteDialog
  );

  const deleteNoteHandler = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  const showColorPallete = (event) => {
    setColorAnchor(event.currentTarget);
  };

  const hideColorPallete = () => {
    setColorAnchor(null);
  };

  const updateColor = (lightColor, darkColor, noteId) => {
    setColorAnchor(null);
    dispatch(
      updateNoteColor({
        noteId: noteId,
        color: { lightColor: lightColor, darkColor: darkColor },
      })
    );
  };

  const removeLabelChip = (labelId, noteId) => {
    dispatch(deleteLabelsFromNote({ labelId: labelId, noteId: noteId }));
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
      {notes?.map((note, index) => (
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
          <div>
            {isHovered === index ? (
              <div className={classes.actions}>
                <Tooltip title="Background Options">
                  <IconButton
                    sx={{ ...style.icons }}
                    onClick={showColorPallete}
                  >
                    <PaletteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <ColorPallete
                  anchor={colorAnchor}
                  hideColorPallete={hideColorPallete}
                  getColor={updateColor}
                  noteId={note.id}
                />
                <Tooltip title="Delete Note">
                  <IconButton
                    sx={{ ...style.icons }}
                    onClick={() => deleteNoteHandler({ noteId: note.id })}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <NoteDialog open={isOpenNoteDialog} note={note} />
              </div>
            ) : null}
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

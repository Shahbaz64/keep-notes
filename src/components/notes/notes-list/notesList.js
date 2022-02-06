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
import NoteDialog from "components/notes/note-dialog/noteDialog";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, showNoteDialog, updateNoteColor } from "store";

const NotesList = ({ notes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(-1);
  const [colorAnchor, setColorAnchor] = useState(null);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const deleteNoteHandler = (noteId) => {
    dispatch(deleteNote(noteId));
  };
  const isOpenNoteDialog = useSelector(
    (state) => state.toggleReducer.isOpenNoteDialog
  );

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
            <LabelChips chips={note.labels} />
          </CardContent>
          {isHovered === index ? (
            <div className={classes.actions}>
              <Tooltip title="Background Options">
                <IconButton sx={{ ...style.icons }} onClick={showColorPallete}>
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
        </Card>
      ))}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesList;

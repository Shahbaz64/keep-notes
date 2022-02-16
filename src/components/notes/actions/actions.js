import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStyles, style } from "components/notes/actions/actions.style";
import { Tooltip, IconButton } from "@mui/material";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NoteDialog from "components/notes/note-dialog/noteDialog";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, updateNoteColor } from "store";

function Actions({ note }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [colorAnchor, setColorAnchor] = useState(null);

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

  return (
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
  );
}

Actions.propTypes = {
  note: PropTypes.object.isRequired,
};

export default Actions;

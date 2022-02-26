import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStyles, style } from "components/notes/actions/actions.style";
import { Tooltip, IconButton } from "@mui/material";
import ColorPallete from "components/add-note/color-pallete/colorPallete";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector } from "react-redux";
import HELPER from "utils/helpers/notes.helper";

const Actions = ({ noteId }) => {
  const classes = useStyles();
  const [colorAnchor, setColorAnchor] = useState(null);
  const userId = useSelector((state) => state.authReducer.user.userId);

  const deleteNoteHandler = (noteId) => {
    HELPER.DELETENOTE(userId, noteId);
  };

  const showColorPallete = (event) => {
    setColorAnchor(event.currentTarget);
  };

  const hideColorPallete = () => {
    setColorAnchor(null);
  };

  const updateColor = (lightColor, darkColor, noteId) => {
    setColorAnchor(null);
    const color = { lightColor: lightColor, darkColor: darkColor };
    HELPER.UPDATENOTECOLOR(userId, noteId, color);
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
        noteId={noteId}
      />
      <Tooltip title="Delete Note">
        <IconButton
          sx={{ ...style.icons }}
          onClick={() => deleteNoteHandler(noteId)}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

Actions.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default Actions;

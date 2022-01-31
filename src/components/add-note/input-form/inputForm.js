import PropTypes from "prop-types";
import { showInputBar } from "store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, TextField, Button, IconButton } from "@mui/material";
import { useStyles } from "components/add-note/input-form/inputForm.style";
import PaletteIcon from "@mui/icons-material/Palette";
import PopOver from "components/add-note/input-form/pop-over/popOver";
import { showPopOver, hidePopOver } from "store";

const InputForm = ({ handleAddNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [anchor, setAnchor] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const isOpenPopOver = useSelector(
    (state) => state.toggleReducer.isOpenPopOver
  );
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
    dispatch(showPopOver());
  };

  const closePopOver = () => {
    dispatch(hidePopOver());
  };

  const getColor = (color) => {
    setColor(color);
    dispatch(hidePopOver());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && text) {
      handleAddNote(title, text, color);
      setText("");
      setTitle("");
      dispatch(showInputBar());
    } else if (!title || !text) {
      setText("");
      setTitle("");
      dispatch(showInputBar());
    } else {
      dispatch(showInputBar());
    }
  };

  return (
    <Card
      elevation={4}
      className={classes.addNoteCard}
      sx={{ borderRadius: "8px" }}
    >
      <form
        className={classes.inputForm}
        style={{ backgroundColor: `${color}` }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          variant="standard"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <TextField
          autoFocus
          multiline
          value={text}
          variant="standard"
          placeholder="Take a Note..."
          onChange={(event) => {
            setText(event.target.value);
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <div className={classes.actions}>
          <IconButton onClick={openPopover}>
            <PaletteIcon fontSize="small" />
          </IconButton>
          <Button type="submit" variant="text" color="inherit">
            Close
          </Button>
        </div>
      </form>
      <PopOver
        open={isOpenPopOver}
        anchor={anchor}
        openPopOver={openPopover}
        closePopOver={closePopOver}
        getColor={getColor}
      />
    </Card>
  );
};

InputForm.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

InputForm.defaultProps = {
  handleAddNote: () => {},
};

export default InputForm;

import PropTypes from "prop-types";
import { showInputBar } from "store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, TextField, Button } from "@mui/material";
import { useStyles } from "components/add-note/input-form/inputForm.style";

const InputForm = ({ handleAddNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && text) {
      handleAddNote(title, text);
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
    <Card elevation={4} className={classes.addNoteCard}>
      <form
        className={classes.inputForm}
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
        <div className={classes.submitButton}>
          <Button type="submit" variant="text" color="inherit">
            close
          </Button>
        </div>
      </form>
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

import PropTypes from "prop-types";
import { showInputBar } from "store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, TextField, Button, IconButton } from "@mui/material";
import {
  useStyles,
  style,
} from "components/add-note/input-form/inputForm.style";
import { useFormik } from "formik";
import * as yup from "yup";
import PaletteIcon from "@mui/icons-material/Palette";
import PopOver from "components/add-note/input-form/pop-over/popOver";
import { showPopOver, hidePopOver } from "store";

const validationSchema = yup.object({
  title: yup.string(),
  text: yup.string(),
});

const InputForm = ({ handleAddNote }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    onSubmit: (values) => {
      if (!values.title || !values.text) {
        dispatch(showInputBar());
      } else {
        handleAddNote(values.title, values.text, color);
        values.title = "";
        values.text = "";
        dispatch(showInputBar());
      }
    },
    validationSchema: validationSchema,
  });

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

  return (
    <Card elevation={4} className={classes.addNoteCard} sx={{ ...style.card }}>
      <form
        className={classes.inputForm}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        style={{ backgroundColor: `${color}` }}
      >
        <TextField
          name="title"
          variant="standard"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <TextField
          name="text"
          autoFocus
          multiline
          variant="standard"
          placeholder="Take a Note..."
          value={formik.values.text}
          onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // error={formik.touched.text && Boolean(formik.errors.text)}
          // helperText={formik.touched.text && formik.errors.text}

          onKeyPress={(e) => {
            if (e.key === "#") {
              console.log(e.key);
            }
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

export default InputForm;

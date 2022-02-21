import PropTypes from "prop-types";
import { showInputBar } from "store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, IconButton, TextField } from "@mui/material";
import {
  useStyles,
  style,
} from "components/add-note/input-form/inputForm.style";
import { useFormik } from "formik";
import PaletteIcon from "@mui/icons-material/Palette";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";
import LabelsList from "components/add-note/input-form/labels-list/labelsList";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import { validationSchema } from "utils/schema/schema";

const InputForm = ({ handleAddNote }) => {
  const initialValues = {
    title: "",
    text: "",
    color: { lightColor: "", darkColor: "" },
    labelChips: [],
    isDeleted: false,
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleAddNote(
        values.title,
        values.text,
        values.color,
        values.isDeleted,
        values.labelChips
      );
      values.title = "";
      values.text = "";
      dispatch(showInputBar());
    },
    validationSchema: validationSchema,
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const [colorAnchor, setColorAnchor] = useState(null);
  const [labelAnchor, setLabelAnchor] = useState(null);
  const [labelChips, setLabelChips] = useState([]);
  const [labelTerm, setLabelTerm] = useState("");
  const mode = useSelector((state) => state.toggleReducer.mode);
  const labels = useSelector((state) => state.notesReducer.labels);

  const addLabelChip = (id, name) => {
    setLabelChips((prevLabelChips) => {
      return [...prevLabelChips, { id: id, name: name }];
    });
    formik.values.labelChips.push({ id: id, name: name });
  };

  const removeChip = (labelId) => {
    formik.values.labelChips.map((chip, index) => {
      if (chip.id === labelId) {
        return formik.values.labelChips.splice(index, 1);
      }
    });
    setLabelChips((prevLabelChips) => {
      const newLabels = prevLabelChips.filter((chip) => chip.id !== labelId);
      return newLabels;
    });
  };

  const showColorPallete = (event) => {
    setColorAnchor(event.currentTarget);
  };

  const hideColorPallete = () => {
    setColorAnchor(null);
  };

  const showLabels = (event) => {
    setLabelAnchor(event.currentTarget);
  };

  const hideLabels = () => {
    setLabelAnchor(null);
  };

  const getColor = (lightColor, darkColor) => {
    formik.values.color = { lightColor: lightColor, darkColor: darkColor };
    setColorAnchor(null);
  };

  const handleKeyUp = (e) => {
    const label = e.target.value.substring(e.target.value.lastIndexOf("#") + 1);
    setLabelTerm(label);
    if (e.key === "#") {
      showLabels(e);
    } else if (e.key === " ") {
      setLabelAnchor(null);
    }
  };

  return (
    <Card elevation={4} className={classes.addNoteCard} sx={{ ...style.card }}>
      <form
        className={classes.inputForm}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        style={{
          backgroundColor: `${
            mode
              ? formik.values.color.darkColor
              : formik.values.color.lightColor
          }`,
        }}
      >
        <TextField
          name="title"
          variant="standard"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          onBlur={formik.handleBlur}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <TextField
          name="text"
          autoFocus
          multiline
          variant="standard"
          placeholder="Take a note..."
          value={formik.values.text}
          onChange={formik.handleChange}
          onKeyUp={handleKeyUp}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
          onBlur={formik.handleBlur}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <LabelsList
          anchor={labelAnchor}
          hideLabels={hideLabels}
          addLabelChip={addLabelChip}
          labels={labels}
          labelTerm={labelTerm}
        />
        <LabelChips chips={labelChips} removeLabelChip={removeChip} />
        <div className={classes.actions}>
          <IconButton onClick={showColorPallete}>
            <PaletteIcon fontSize="small" />
          </IconButton>
          <Button type="submit" variant="text" color="inherit">
            Close
          </Button>
        </div>
        <ColorPallete
          anchor={colorAnchor}
          hideColorPallete={hideColorPallete}
          getColor={getColor}
        />
      </form>
    </Card>
  );
};

InputForm.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
};

export default InputForm;

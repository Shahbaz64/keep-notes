import PropTypes from "prop-types";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useStyles, style } from "components/add-note/inputForm.style";
import PaletteIcon from "@mui/icons-material/Palette";
import { validationSchema } from "utils/schema/schema";
import { Card, Button, IconButton, TextField } from "@mui/material";
import LabelsList from "components/add-note/labels-list/labelsList";
import LabelChips from "components/add-note/label-chips/labelChip";
import ColorPallete from "components/add-note/color-pallete/colorPallete";

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
      values.color = { lightColor: "", darkColor: "" };
      values.labelChips = [];
      setLabelChips([]);
      setInputBar(true);
    },
    validationSchema: validationSchema,
  });

  const classes = useStyles();
  const [inputBar, setInputBar] = useState(true);
  const [colorAnchor, setColorAnchor] = useState(null);
  const [labelAnchor, setLabelAnchor] = useState(null);
  const [labelChips, setLabelChips] = useState([]);
  const [labelTerm, setLabelTerm] = useState("");
  const [index, setIndex] = useState(-1);
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);
  const labels = useSelector((state) => state.notesReducer.labels);

  const addLabelChip = (id, name) => {
    const alreadyLabelChips = labelChips.map((label) => label.name);
    if (!alreadyLabelChips.includes(name)) {
      setLabelChips((prevLabelChips) => {
        return [...prevLabelChips, { id: id, name: name }];
      });
      formik.values.labelChips.push({ id: id, name: name });
    }
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
    if (e.target.value.length <= index) {
      setLabelAnchor(null);
    }
    const value = e.target.value.slice(0, -1);
    if (e.key === "#") {
      showLabels(e);
      setIndex(e.target.value.lastIndexOf("#") - 1);
      formik.values.text = value;
    } else if (e.key === " ") {
      setLabelAnchor(null);
    }
    const label = e.target.value.substring(index + 1);
    setLabelTerm(label);
  };

  if (inputBar) {
    return (
      <Card
        elevation={4}
        className={classes.inputBar}
        onClick={() => setInputBar(false)}
        sx={{ ...style.card }}
      >
        Take a note...
      </Card>
    );
  }

  if (!inputBar) {
    return (
      <Card
        elevation={4}
        className={classes.addNoteCard}
        sx={{ ...style.card }}
      >
        <form
          className={classes.inputForm}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          style={{
            backgroundColor: `${
              darkMode
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
  }
};

InputForm.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

export default InputForm;

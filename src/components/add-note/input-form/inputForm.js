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
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";
import LabelsList from "components/add-note/input-form/labels-list/labelsList";
import LabelChips from "components/add-note/input-form/label-chips/labelChip";
import { addLabelChips, emptyLabelChips, removeLabelChip } from "store";

const validationSchema = yup.object({
  title: yup.string(),
  text: yup.string(),
  color: yup.object(),
  labelChips: yup.array(),
});

const InputForm = ({ handleAddNote }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      color: { lightColor: "", darkColor: "" },
      labelChips: [],
    },
    onSubmit: (values) => {
      if (!values.title || !values.text) {
        dispatch(showInputBar());
        dispatch(emptyLabelChips());
      } else {
        handleAddNote(
          values.title,
          values.text,
          values.color,
          values.labelChips
        );
        values.title = "";
        values.text = "";
        dispatch(showInputBar());
        dispatch(emptyLabelChips());
      }
    },
    validationSchema: validationSchema,
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const [colorAnchor, setColorAnchor] = useState(null);
  const [labelAnchor, setLabelAnchor] = useState(null);
  const mode = useSelector((state) => state.toggleReducer.mode);
  const labels = useSelector((state) => state.notesReducer.labels);
  const labelChips = useSelector((state) => state.notesReducer.labelChips);

  const addLabelChip = (id, name, notes) => {
    dispatch(addLabelChips({ id: id, name: name, notes: notes }));
    formik.values.labelChips.push({ id: id, name: name, notes: notes });
  };

  const removeChip = (labelId) => {
    formik.values.labelChips.map((chip, index) => {
      if (chip.id === labelId) {
        return formik.values.labelChips.splice(index, 1);
      }
    });
    dispatch(removeLabelChip(labelId));
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
          onKeyDown={(event) => {
            if (event.key === "#") {
              showLabels(event);
            } else {
              setLabelAnchor(null);
            }
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <LabelsList
          anchor={labelAnchor}
          hideLabels={hideLabels}
          addLabelChip={addLabelChip}
          labels={labels}
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
      </form>
      <ColorPallete
        anchor={colorAnchor}
        hideColorPallete={hideColorPallete}
        getColor={getColor}
      />
    </Card>
  );
};

InputForm.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

export default InputForm;

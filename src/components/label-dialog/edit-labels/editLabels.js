import React, { createRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "components/label-dialog/edit-labels/editLabel.style";
import { IconButton, TextField } from "@mui/material";
import { updateLabel, deleteLabel } from "store";

const EditLabels = ({ labels }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newLabels, setNewLabels] = useState(labels);
  const [isFocused, setIsFocused] = useState(-1);
  const inputRefs = [];

  const setRef = (ref) => {
    inputRefs.push(ref);
  };

  useEffect(() => {
    if (labels.length !== newLabels.length) {
      setNewLabels(labels);
    }
  });

  const handleChange = (event, id) => {
    setNewLabels((prevLabels) => {
      return prevLabels.map((label) => {
        let editLabel = { ...label };
        if (editLabel.id === id) {
          editLabel.name = event.target.value;
        }
        return editLabel;
      });
    });
  };

  const handleLabelFocus = (index) => {
    inputRefs[index].current.focus();
    setIsFocused(index);
  };

  const handleUpdateLabel = (index) => {
    const labelName = newLabels[index].name;
    const labelId = newLabels[index].id;
    console.log(labelName, labelId);
    dispatch(updateLabel({ labelId, labelName }));
  };

  const handleDeleteLabel = (index) => {
    const labelId = newLabels[index].id;
    dispatch(deleteLabel({ labelId }));
  };

  return (
    <div className={classes.labels}>
      {newLabels.map((label, index) => {
        const ref = createRef();
        setRef(ref);
        return (
          <div key={label.id}>
            {isFocused === index ? (
              <IconButton onClick={() => handleDeleteLabel(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton>
                <LabelIcon fontSize="small" />
              </IconButton>
            )}

            <TextField
              sx={{ marginLeft: "12px", marginRight: "12px" }}
              variant="standard"
              inputRef={ref}
              value={label.name}
              onFocus={() => handleLabelFocus(index)}
              onChange={(event) => {
                handleChange(event, label.id);
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            {isFocused === index ? (
              <IconButton onClick={() => handleUpdateLabel(index)}>
                <DoneIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleLabelFocus(index)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        );
      })}
    </div>
  );
};

EditLabels.propTypes = {
  labels: PropTypes.array.isRequired,
};

EditLabels.defaultProps = {
  labels: [],
};

export default EditLabels;

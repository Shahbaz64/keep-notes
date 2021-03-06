import React, { createRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useStyles,
  style,
} from "components/label-dialog/edit-labels/editLabel.style";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { updateLabel, deleteLabel } from "store";

const EditLabels = ({ labels }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newLabels, setNewLabels] = useState(labels);
  const [isFocused, setIsFocused] = useState(-1);
  const [isHovered, setIsHovered] = useState(-1);

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
            {isHovered === index || isFocused === index ? (
              <Tooltip title="Delete Label">
                <IconButton
                  onClick={() => {
                    handleDeleteLabel(index);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(-1);
                    setIsFocused(-1);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => {
                  setIsHovered(-1);
                }}
              >
                <LabelIcon fontSize="small" />
              </IconButton>
            )}

            <TextField
              sx={{ ...style.input }}
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
              <Tooltip title="Rename Label">
                <IconButton onClick={() => handleUpdateLabel(index)}>
                  <DoneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Rename Label">
                <IconButton onClick={() => handleLabelFocus(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
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

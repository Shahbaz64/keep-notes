import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import HELPER from "utils/helpers/notes.helper";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { createRef, useState, useEffect } from "react";
import {
  useStyles,
  style,
} from "components/label-dialog/edit-labels/editLabel.style";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { labelPropType } from "utils/constants/prop-types.constant";

const EditLabels = ({ labels }) => {
  const classes = useStyles();
  const [newLabels, setNewLabels] = useState(labels);
  const [isFocused, setIsFocused] = useState(-1);
  const [isHovered, setIsHovered] = useState(-1);
  const userId = useSelector((state) => state.authReducer.user.userId);
  const notes = useSelector((state) => state.notesReducer.notes);
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
    HELPER.UPDATELABEL(userId, labelId, labelName);
    notes.map((note) => {
      const newLabels = note.labels?.map((label) => {
        let newLabel = { ...label };
        if (newLabel.id === labelId) {
          newLabel.name = labelName;
          return newLabel;
        }
        return newLabel;
      });
      HELPER.UPDATELABELFROMNOTES(userId, note.id, newLabels);
    });
  };

  const handleDeleteLabel = (index) => {
    const labelId = newLabels[index].id;
    HELPER.DELETELABEL(userId, labelId);
    notes.map((note) => {
      note.labels?.map((label) => {
        if (label.id === labelId) {
          const newLabels = note.labels.filter((label) => label.id !== labelId);
          HELPER.DELETELABELFROMNOTE(userId, note.id, newLabels);
        }
      });
    });
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
  labels: labelPropType,
};

EditLabels.defaultProps = {
  labels: [],
};

export default EditLabels;

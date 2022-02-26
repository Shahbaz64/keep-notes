import React from "react";
import PropTypes from "prop-types";
import {
  useStyles,
  style,
} from "components/add-note/label-chips/labelChips.style";
import { Stack, Chip } from "@mui/material";

const LabelChips = ({ chips, removeLabelChip, noteId }) => {
  const classes = useStyles();
  return (
    <Stack direction="row" spacing={0.5} className={classes.labelsChips}>
      {chips?.map((chip) => {
        return (
          <Chip
            key={chip.id}
            size="small"
            className={classes.chip}
            label={chip.name}
            sx={{ ...style.chip }}
            onDelete={() => removeLabelChip(chip.id, noteId)}
          />
        );
      })}
    </Stack>
  );
};

LabelChips.propTypes = {
  noteId: PropTypes.string,
  chips: PropTypes.array,
  removeLabelChip: PropTypes.func,
};

LabelChips.defaultProps = {
  noteId: "",
  chips: [],
  removeLabelChip: () => {},
};

export default LabelChips;

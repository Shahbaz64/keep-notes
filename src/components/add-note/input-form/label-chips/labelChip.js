import React from "react";
import PropTypes from "prop-types";
import {
  useStyles,
  style,
} from "components/add-note/input-form/label-chips/labelChips.style";
import { Stack, Chip } from "@mui/material";

const LabelChips = ({ chips }) => {
  const classes = useStyles();

  return (
    <Stack direction="row" spacing={0.5} className={classes.labelsChips}>
      {chips.map((chip) => {
        return (
          <Chip
            key={chip.id}
            size="small"
            label={chip.name}
            sx={{ ...style.chip }}
          />
        );
      })}
    </Stack>
  );
};

LabelChips.propTypes = {
  chips: PropTypes.array,
};

export default LabelChips;

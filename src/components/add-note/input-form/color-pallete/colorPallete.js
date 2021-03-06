import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { Grid, Tooltip, Box } from "@mui/material";
import { Popover } from "@mui/material";
import InvertColorsOffOutlinedIcon from "@mui/icons-material/InvertColorsOffOutlined";
import { bgColors } from "components/add-note/input-form/color-pallete/bgColors";
import {
  useStyles,
  style,
} from "components/add-note/input-form/color-pallete/colorPallete.style";

const ColorPallete = ({ anchor, hideColorPallete, getColor, noteId }) => {
  const classes = useStyles();
  const mode = useSelector((state) => state.toggleReducer.mode);

  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={hideColorPallete}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Grid container direction="row">
        <Tooltip title="Default">
          <Box
            onClick={() => getColor("#FFFFFF", "#121212", noteId)}
            className={classes.avatar}
            sx={{ ...style.box }}
          >
            <InvertColorsOffOutlinedIcon fontSize="small" />
          </Box>
        </Tooltip>
        {bgColors.map((bgColor) => {
          return (
            <Tooltip key={nanoid()} title={bgColor.title}>
              <Box
                onClick={() =>
                  getColor(bgColor.lightColor, bgColor.darkColor, noteId)
                }
                sx={{
                  ...style.box,
                  backgroundColor: `${
                    mode ? bgColor.darkColor : bgColor.lightColor
                  }`,
                }}
              />
            </Tooltip>
          );
        })}
      </Grid>
    </Popover>
  );
};

ColorPallete.propTypes = {
  noteId: PropTypes.string,
  anchor: PropTypes.object,
  hideColorPallete: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
};

ColorPallete.defaultProps = {
  anchor: null,
  noteId: "",
};

export default ColorPallete;

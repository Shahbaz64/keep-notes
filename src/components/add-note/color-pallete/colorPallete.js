import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { Grid, Tooltip, Box } from "@mui/material";
import { useStyles } from "components/add-note/color-pallete/colorPallete.style";
import { bgColors } from "components/add-note/color-pallete/bgColors";
import InvertColorsOffOutlinedIcon from "@mui/icons-material/InvertColorsOffOutlined";

const ColorPallete = ({ anchor, hideColorPallete, getColor, noteId }) => {
  const classes = useStyles();
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);

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
                className={classes.avatar}
                sx={{
                  backgroundColor: `${
                    darkMode ? bgColor.darkColor : bgColor.lightColor
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

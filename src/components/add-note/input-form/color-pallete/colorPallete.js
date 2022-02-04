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

const ColorPallete = ({ anchor, hideColorPallete, getColor }) => {
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
            onClick={() => getColor(mode ? "#121212" : "#FFFFFF")}
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
                onClick={() => getColor(bgColor.lightColor, bgColor.darkColor)}
                sx={{
                  ...style.box,
                  backgroundColor: `${
                    mode ? bgColor.darkColor : bgColor.lightColor
                  }`,
                }}
              ></Box>
            </Tooltip>
          );
        })}
      </Grid>
    </Popover>
  );
};

ColorPallete.propTypes = {
  // open: PropTypes.bool,
  anchor: PropTypes.object,
  hideColorPallete: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
};

ColorPallete.defaultProps = {
  // open: false,
  anchor: null,
};

export default ColorPallete;

import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useStyles, style } from "./popOver.style";
import { Box, Grid, Tooltip } from "@mui/material";
import { Popover as MuiPopover } from "@mui/material";
import { colors } from "components/add-note/input-form/pop-over/bgColors";
import InvertColorsOffOutlinedIcon from "@mui/icons-material/InvertColorsOffOutlined";

const PopOver = ({ open, anchor, closePopOver, getColor }) => {
  const classes = useStyles();
  return (
    <div>
      <MuiPopover
        open={open}
        anchorEl={anchor}
        onClose={closePopOver}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Grid container direction="row">
          <Tooltip title="Default">
            <Box
              onClick={() => getColor("#FFFFFF")}
              className={classes.avatar}
              sx={{ ...style.box }}
            >
              <InvertColorsOffOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
          {colors.map((bgColor) => {
            return (
              <Tooltip
                key={nanoid()}
                title={bgColor.title}
                sx={{ fontSize: "30px" }}
              >
                <Box
                  onClick={() => getColor(bgColor.color)}
                  sx={{
                    ...style.box,
                    backgroundColor: `${bgColor.color}`,
                  }}
                ></Box>
              </Tooltip>
            );
          })}
        </Grid>
      </MuiPopover>
    </div>
  );
};

PopOver.propTypes = {
  open: PropTypes.bool,
  anchor: PropTypes.object,
  closePopOver: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
};

PopOver.defaultProps = {
  open: false,
  anchor: null,
};

export default PopOver;

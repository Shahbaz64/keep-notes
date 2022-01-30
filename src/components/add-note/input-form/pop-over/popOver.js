import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useStyles } from "./popOver.style";
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
              sx={{
                height: "28px",
                width: "28px",
                margin: "4px 3px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "1px solid #B3B3B3",
                "&:hover": {
                  border: "1px solid #373737",
                },
              }}
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
                    backgroundColor: `${bgColor.color}`,
                    height: "28px",
                    width: "28px",
                    margin: "4px 3px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    "&:hover": {
                      border: "1px solid #373737",
                    },
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
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.object,
  closePopOver: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
};

PopOver.defaultProps = {
  open: false,
  anchor: null,
  getColor: () => {},
  closePopOver: () => {},
};

export default PopOver;

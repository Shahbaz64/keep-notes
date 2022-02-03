import React from "react";
import PropTypes from "prop-types";
import { Popover as MuiPopover } from "@mui/material";
import ColorPallete from "components/add-note/input-form/color-pallete/colorPallete";

const PopOver = ({ open, anchor, closePopOver, getColor }) => {
  return (
    <div>
      <MuiPopover
        open={open}
        anchorEl={anchor}
        onClose={closePopOver}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <ColorPallete getColor={getColor} />
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

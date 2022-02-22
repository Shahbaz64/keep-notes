import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "components/snackbar/snackBar.style";
import { IconButton, Snackbar as MuiSnackBar } from "@mui/material";

const SnackBar = ({ open, handleClose, msg }) => {
  return (
    <div>
      <MuiSnackBar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ ...style.anchor }}
        message={msg}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      ></MuiSnackBar>
    </div>
  );
};

SnackBar.propTypes = {
  msg: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

SnackBar.defaultProps = {
  msg: "Error!",
  open: false,
  handleClose: () => {},
};

export default SnackBar;

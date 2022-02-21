import React from "react";
import { IconButton, Snackbar as MuiSnackBar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackBar } from "store";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { style } from "components/snackbar/snackBar.style";

const SnackBar = ({ msg }) => {
  const dispatch = useDispatch();
  const isOpenSnackBar = useSelector(
    (state) => state.toggleReducer.isOpenSnackBar
  );

  return (
    <div>
      <MuiSnackBar
        open={isOpenSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ ...style.anchor }}
        message={msg}
        onClose={() => dispatch(hideSnackBar())}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => dispatch(hideSnackBar())}
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
};

SnackBar.defaultProps = {
  msg: "Error!",
};

export default SnackBar;

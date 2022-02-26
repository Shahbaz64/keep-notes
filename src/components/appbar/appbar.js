import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar as MuiAppBar,
  Grid,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  SvgIcon,
  Divider,
  Card,
} from "@mui/material";
import { toggleDrawer, toggleView, toggleTheme } from "store";
import { setSearchTerm } from "store";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "components/appbar/appbar-actions/actions";
import { useStyles, style } from "components/appbar/appbar.style";
import { ReactComponent as KeepIcon } from "assets/google-keep.svg";
import path from "utils/constants/path.constant";
import CloseIcon from "@mui/icons-material/Close";

const AppBar = ({ handleSignOut }) => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const darkMode = useSelector((state) => state.toggleReducer.darkMode);
  const appBarHeader = useSelector((state) => state.notesReducer.appBarHeader);
  const dispatch = useDispatch();
  const classes = useStyles({ openSearchBar, darkMode });
  const navigate = useNavigate();

  const handleNotesView = () => {
    dispatch(toggleView());
  };

  const handleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      className={classes.appbar}
      sx={{ ...style.toolbar }}
    >
      <Toolbar className={classes.toolbar}>
        <Tooltip title="Main Menu">
          <IconButton
            edge="start"
            size="large"
            aria-label="menu"
            onClick={() => {
              dispatch(toggleDrawer());
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        {appBarHeader === "Notes" ? (
          <div className={classes.header}>
            <SvgIcon fontSize="large" component={KeepIcon} inheritViewBox />
            <Typography fontSize="large">Keep</Typography>
          </div>
        ) : (
          <Typography fontSize="large">{appBarHeader}</Typography>
        )}
        <Grid container alignItems="center">
          <div className={classes.searchInput}>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Card elevation={0} className={classes.searchCard}>
              <InputBase
                placeholder="Search"
                className={classes.input}
                onChange={(e) => {
                  dispatch(setSearchTerm(e.target.value));
                }}
                onFocus={() => {
                  setCancelButton(true);
                  navigate(path.SEARCH);
                }}
              />
            </Card>
            {cancelButton && (
              <IconButton
                className={classes.closeIcon}
                onClick={() => {
                  navigate(path.HOME);
                  setCancelButton(false);
                  setOpenSearchBar(false);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </div>

          <div className={classes.actions}>
            <Grid item className={classes.searchIcon}>
              <IconButton onClick={() => setOpenSearchBar(true)}>
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Actions
                handleSignOut={handleSignOut}
                handleNotesView={handleNotesView}
                handleThemeMode={handleThemeMode}
              />
            </Grid>
          </div>
        </Grid>
      </Toolbar>
      <Divider />
    </MuiAppBar>
  );
};

AppBar.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default AppBar;

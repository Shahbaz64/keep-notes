import React from "react";
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
} from "@mui/material";
import { toggleDrawer, toggleView, toggleMode } from "store";
import { setSearchTerm } from "store";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "components/appbar/appbar-actions/actions";
import { useStyles, style } from "components/appbar/appbar.style";
import { ReactComponent as KeepIcon } from "assets/google-keep.svg";
import path from "utils/constants/path.constant";

const AppBar = ({ handleSignOut }) => {
  const isSearchBar = useMediaQuery("(min-width: 660px)");
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.toggleReducer.mode);

  const handleNotesView = () => {
    dispatch(toggleView());
  };

  const handleThemeMode = () => {
    dispatch(toggleMode());
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
        <SvgIcon fontSize="large" component={KeepIcon} inheritViewBox />
        <Typography fontSize="large">Keep</Typography>
        <Grid container alignItems="center">
          {isSearchBar && (
            <Grid item>
              <InputBase
                startAdornment={<SearchIcon />}
                placeholder="Search"
                className={classes.searchInput}
                onChange={(e) => {
                  dispatch(setSearchTerm(e.target.value));
                }}
                onFocus={() => navigate(path.SEARCH)}
                sx={mode ? { ...style.darkColor } : { ...style.lightColor }}
              />
            </Grid>
          )}
          <div className={classes.actions}>
            {!isSearchBar && (
              <Grid item>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Grid>
            )}
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
};

export default AppBar;

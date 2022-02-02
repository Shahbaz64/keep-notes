import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  AppBar as MuiAppBar,
  Grid,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { toggleDrawer } from "store";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles, style } from "components/appbar/appbar.style";
import Actions from "components/appbar/appbar-actions/actions";
import { ReactComponent as KeepIcon } from "assets/google-keep.svg";

const AppBar = ({ handleSignOut }) => {
  const isSearchBar = useMediaQuery("(min-width: 600px)");
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" elevation={0} sx={{ ...style.toolbar }}>
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
        <Typography color="black" fontSize="large">
          Keep
        </Typography>
        <Grid container alignItems="center">
          {isSearchBar && (
            <Grid item>
              <InputBase
                className={classes.searchInput}
                placeholder="Search"
                startAdornment={<SearchIcon />}
              />
            </Grid>
          )}
          <div className={classes.actions}>
            {!isSearchBar && (
              <Grid item>
                <IconButton size="large">
                  <SearchIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item>
              <Actions handleSignOut={handleSignOut} />
            </Grid>
          </div>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
};

export default AppBar;

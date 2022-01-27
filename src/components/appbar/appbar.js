import React from "react";
import PropTypes from "prop-types";
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
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "store";
import { ReactComponent as KeepIcon } from "assets/google-keep.svg";
import { v4 as uuid } from "uuid";
import { useStyles } from "components/appbar/appbar.style";
import { useMediaQuery } from "@mui/material";

const AppBar = ({ handleSignOut }) => {
  const isSearchBar = useMediaQuery("(min-width: 600px)");
  const dispatch = useDispatch();
  const classes = useStyles();
  const actions = [
    {
      icon: <TableRowsIcon />,
      title: "Grid View",
      handleClick: handleSignOut,
    },
    {
      icon: <InvertColorsIcon />,
      title: "Dark Mode",
      handleClick: handleSignOut,
    },
    {
      icon: <LogoutIcon />,
      title: "Logout",
      handleClick: handleSignOut,
    },
  ];

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
              {actions.map((icon) => (
                <Tooltip key={uuid()} title={icon.title}>
                  <IconButton onClick={icon.handleClick} size="large">
                    {icon.icon}
                  </IconButton>
                </Tooltip>
              ))}
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

AppBar.defaultProps = {
  handleSignOut: () => {},
};

export default AppBar;

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      "& .MuiToolbar-root": {
        minHeight: "60px",
        maxHeight: "60px",
      },
    },
    header: {
      display: "flex",
      alignItems: "center",
    },
    toolbar: {
      alignItems: "center",
      backgroundColor: "text",
      "& .MuiSvgIcon-root": {
        margin: theme.spacing(0.2),
      },
      "& .MuiTypography-root": {
        marginLeft: theme.spacing(1),
      },
    },
    searchInput: {
      width: "50%",
      opacity: "0.8",
      display: "flex",
      marginLeft: "5vw",
      alignItems: "center",
      borderRadius: theme.spacing(1),
      padding: theme.spacing(0.275, 0.4),
      backgroundColor: (props) => (props.darkMode ? "#292929" : "#F1F3F4"),
      [theme.breakpoints.down("sm")]: {
        display: (props) => (props.openSearchBar ? "flex" : "none"),
        width: "85%",
      },
    },

    closeIcon: {
      display: "block",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },

    input: {
      width: "100%",
      backgroundColor: (props) => (props.darkMode ? "#292929" : "#F1F3F4"),
    },
    actions: {
      display: (props) => (props.openSearchBar ? "none" : "flex"),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
      marginLeft: "auto",
      marginRight: "0",
    },
    searchCard: {
      display: "flex",
      marginLeft: "4px",
      width: "100%",
    },

    searchIcon: {
      display: "blcok",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  };
});

export const style = {
  toolbar: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
};

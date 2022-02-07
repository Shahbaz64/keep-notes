import { makeStyles } from "@mui/styles";

const drawerWidth = 270;

export const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "none",
    "& .MuiDrawer-paper": {
      marginTop: "55px",
      width: drawerWidth,
      boxSizing: "border-box",
    },
    "& .MuiPaper-root": {
      borderRight: "none",
    },
    "& .MuiButtonBase-root": {
      borderBottomRightRadius: "50px",
      borderTopRightRadius: "50px",
    },
  },
});

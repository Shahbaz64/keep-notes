import { makeStyles } from "@mui/styles";

const drawerWidth = 270;

export const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      marginTop: "60px",
      width: drawerWidth,
      boxSizing: "border-box",
    },
    "& .MuiPaper-root": {
      borderRight: "none",
    },
    "& .MuiButtonBase-root": {
      borderBottomRightRadius: "50px",
      borderTopRightRadius: "50px",
      "&:hover": {
        backgroundColor: "#F1F3F4",
      },
    },
  },
});

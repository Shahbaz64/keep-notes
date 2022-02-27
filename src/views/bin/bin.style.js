import { makeStyles } from "@mui/styles";
import { drawerWidth } from "utils/constants/drawer.constant";

export const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "80px",
      margin: "0 auto",
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },

    shiftContentLeft: {
      marginLeft: "0px",
    },

    shiftContentRight: {
      marginLeft: drawerWidth,
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0px",
      },
    },

    notesGrid: {
      margin: "20px auto",
      width: "85%",
      [theme.breakpoints.down("md")]: {
        width: "75%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "60%",
      },
    },
    notesList: {
      margin: "20px auto",
      width: "40%",
      [theme.breakpoints.down("md")]: {
        width: "75%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    center: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      margin: "auto auto",
      justifyContent: "center",
      alignItems: "center",
      color: "#CCCCCC",
      marginTop: "15%",
    },
  };
});

export const style = {
  emptyButton: {
    marginLeft: "20px",
  },
};

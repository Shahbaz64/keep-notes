import { makeStyles } from "@mui/styles";
import { drawerWidth } from "utils/constants/drawer.constant";

export const useStyles = makeStyles((theme) => {
  return {
    header: {
      marginTop: "80px",
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
      [theme.breakpoints.down("xs")]: {
        width: "60%",
      },
    },
  };
});

export const style = {
  btn: {
    color: "blue",
    marginLeft: "8px",
  },
};

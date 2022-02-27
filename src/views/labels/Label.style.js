import { makeStyles } from "@mui/styles";
import { drawerWidth } from "utils/constants/drawer.constant";

export const useStyles = makeStyles((theme) => {
  return {
    shiftContentLeft: {
      marginLeft: "0px",
    },

    shiftContentRight: {
      marginLeft: drawerWidth,
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0px",
      },
    },
    notes: {
      margin: "20px auto",
      width: "85%",
      [theme.breakpoints.down("md")]: {
        width: "75%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "60%",
      },
    },
    center: {
      display: "flex",
      flexDirection: "column",
      width: "85%",
      margin: "auto auto",
      justifyContent: "center",
      alignItems: "center",
      color: "#CCCCCC",
      marginTop: "15%",
      [theme.breakpoints.down("xs")]: {
        width: "65%",
      },
    },
  };
});

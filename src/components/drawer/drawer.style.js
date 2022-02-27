import { makeStyles } from "@mui/styles";
import { drawerWidth } from "utils/constants/drawer.constant";

export const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: "none",
      "& .MuiDrawer-paper": {
        marginTop: "62px",
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
      "& .MuiList-root": {
        paddingTop: "4px",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  };
});

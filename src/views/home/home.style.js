import { makeStyles } from "@mui/styles";

const drawerWidth = 270;

export const useStyles = makeStyles({
  shiftTextLeft: {
    marginLeft: "0px",
  },
  shiftTextRight: {
    marginLeft: drawerWidth,
  },
  notes: {
    margin: "20px auto",
    width: "90%",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    margin: "auto auto",
    justifyContent: "center",
    alignItems: "center",
    color: "#CCCCCC",
    marginTop: "15%",
  },
});

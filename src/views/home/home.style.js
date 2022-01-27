import { makeStyles } from "@mui/styles";

const drawerWidth = 270;

export const useStyles = makeStyles({
  shiftTextLeft: {
    marginLeft: "0px",
  },
  shiftTextRight: {
    marginLeft: drawerWidth,
  },
  allNotes: {
    margin: "20px auto",
    width: "90%",
  },
});

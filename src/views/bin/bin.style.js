import { makeStyles } from "@mui/styles";

const drawerWidth = 270;

export const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80px",
    margin: "0 auto",
    width: "50%",
  },

  shiftTextLeft: {
    marginLeft: "0px",
  },
  shiftTextRight: {
    marginLeft: drawerWidth,
  },
  notesGrid: {
    margin: "20px auto",
    width: "90%",
  },
  notesList: {
    margin: "20px auto",
    width: "40%",
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

export const style = {
  btn: {
    color: "blue",
    marginLeft: "8px",
  },
};

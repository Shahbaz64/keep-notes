import { makeStyles } from "@mui/styles";

const drawerWidth = 270;

export const useStyles = makeStyles({
  header: {
    marginTop: "80px",
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
});

export const style = {
  btn: {
    color: "blue",
    marginLeft: "8px",
  },
};

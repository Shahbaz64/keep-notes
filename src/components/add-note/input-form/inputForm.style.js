import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  addNoteCard: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    margin: "20px auto",
    marginTop: "80px",
  },
  inputForm: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    paddingBottom: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    marginRight: "0",
    marginBottom: "0",
  },
  body: {
    height: "100vh",
  },
});

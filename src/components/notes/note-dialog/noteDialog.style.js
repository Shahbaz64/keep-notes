import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    paddingBottom: "8px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
    marginRight: "0",
    marginBottom: "0",
  },
  dialog: {
    "& .MuiPaper-root": {
      borderRadius: "8px",
    },
  },
});

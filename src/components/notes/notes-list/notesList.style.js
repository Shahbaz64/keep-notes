import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  noteCard: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
    margin: "20px auto",
    marginTop: "20px",
    "& .MuiCardContent-root": {
      paddingBottom: "2px",
      paddingTop: "6px",
      marginBottom: "6px",
    },
  },
  innerText: {
    wordBreak: "break-all",
  },
  actions: {
    marginLeft: "10px",
  },
});

export const style = {
  card: {
    borderRadius: "8px",
  },
  header: {
    pb: "2px",
  },
  icons: {
    mr: "4px",
    mb: "4px",
  },
};

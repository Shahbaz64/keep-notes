import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  noteCard: {
    marginTop: "10px",
    borderRadius: "10px",
    "& .MuiCardContent-root": {
      paddingTop: "6px",
      marginBottom: "6px",
      paddingBottom: "2px",
    },
  },
  innerText: {
    wordBreak: "break-all",
  },
});

export const style = {
  header: {
    pb: "2px",
  },
  card: {
    borderRadius: "8px",
  },
};

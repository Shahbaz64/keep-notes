import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  noteCard: {
    marginTop: "10px",
    borderRadius: "18px",
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
  header: {
    pb: "2px",
  },
  icons: {
    mr: "4px",
    mb: "4px",
  },
  card: {
    borderRadius: "8px",
  },
};

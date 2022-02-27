import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    notesList: {
      margin: "20px auto",
      width: "40%",
      [theme.breakpoints.down("md")]: {
        width: "75%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  };
});

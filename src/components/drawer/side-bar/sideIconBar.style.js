import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      flexShrink: 0,
      backgroundColor: "none",
      "& .MuiDrawer-paper": {
        marginTop: "62px",
        boxSizing: "border-box",
      },
      "& .MuiPaper-root": {
        borderRight: "none",
      },
      "& .MuiButtonBase-root": {
        margin: "2px 8px 2px 8px",
      },
      "& .MuiList-root": {
        paddingTop: "4px",
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
  };
});

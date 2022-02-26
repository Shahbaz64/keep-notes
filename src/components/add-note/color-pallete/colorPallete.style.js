import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "26px",
      width: "26px",
      margin: "4px 2px",
      borderRadius: "50%",
      cursor: "pointer",
      border: "1px solid #B3B3B3",
      "&:hover": {
        border: "1px solid #373737",
      },
      [theme.breakpoints.down("xs")]: {
        height: "22px",
        width: "22px",
        margin: "3px 2px",
      },
    },
  };
});

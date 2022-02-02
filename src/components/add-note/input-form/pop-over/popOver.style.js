import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const style = {
  box: {
    height: "28px",
    width: "28px",
    margin: "4px 3px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "1px solid #B3B3B3",
    "&:hover": {
      border: "1px solid #373737",
    },
  },
};

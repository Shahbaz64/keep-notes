import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    dialogContent: {
      [theme.breakpoints.down("xs")]: {
        "& .MuiDialogContent-root": {
          paddingRight: "8px",
          paddingLeft: "8px",
        },
        "& .MuiTypography-root": {
          paddingRight: "8px",
          paddingLeft: "8px",
        },
      },
    },
  };
});

export const style = {
  input: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  error: {
    fontSize: "14px",
    marginTop: "8px",
    marginLeft: "12px",
  },
};

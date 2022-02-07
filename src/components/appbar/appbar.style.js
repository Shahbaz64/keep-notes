import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      "& .MuiToolbar-root": {
        minHeight: "60px",
        maxHeight: "60px",
      },
    },
    toolbar: {
      alignItems: "center",
      backgroundColor: "text",
      "& .MuiSvgIcon-root": {
        margin: theme.spacing(0.2),
      },
      "& .MuiTypography-root": {
        marginLeft: theme.spacing(1),
      },
    },
    searchInput: {
      opacity: "0.9",
      marginLeft: "5vw",
      width: "40vw",
      backgroundColor: "text",
      padding: theme.spacing(1, 1),
      borderRadius: theme.spacing(1),
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
    },
    actions: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "0",
    },
  };
});

export const style = {
  toolbar: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
};

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      alignItems: "center",
      backgroundColor: "#fff",
      borderBottom: "1px solid #DADCE0",
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
      backgroundColor: "#F1F3F4",
      padding: theme.spacing(1, 1),
      borderRadius: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#F1F3F4",
      },
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

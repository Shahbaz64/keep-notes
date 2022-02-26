import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    addNoteCard: {
      display: "flex",
      flexDirection: "column",
      width: "40%",
      margin: "0 auto",
      marginTop: "80px",
      [theme.breakpoints.down("md")]: {
        width: "55%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "65%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "60%",
      },
    },

    inputBar: {
      marginTop: "80px",
      padding: "12px",
      width: "40%",
      margin: "0 auto",
      cursor: "text",
      [theme.breakpoints.down("md")]: {
        width: "55%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "65%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "60%",
      },
    },

    inputForm: {
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      paddingBottom: "8px",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "5px",
      marginRight: "0",
      marginBottom: "0",
    },
    body: {
      height: "100vh",
    },
  };
});

export const style = {
  card: {
    borderRadius: "8px",
  },
};

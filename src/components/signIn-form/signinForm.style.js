import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  body: {
    backgroundColor: "#F5F5F5",
    height: "100vh",
    width: "100vw",
  },
  centerCard: {
    top: "50%",
    left: "50%",
    width: "380px",
    position: "absolute",
    transform: "Translate(-50%,-50%)",
  },
  signInCard: {
    padding: "60px 20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  subHeader: {
    display: "flex",
    marginTop: "12px",
    alignItems: "center",
    justifyContent: "center",
  },

  signInBtn: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

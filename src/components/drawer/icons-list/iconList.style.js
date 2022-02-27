import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  iconsList: {
    display: "flex",
    flexDirection: "column",
  },
});

export const style = {
  lightActive: {
    backgroundColor: "#FEEFC3",
    "&: hover": {
      backgroundColor: "#FEEFC3",
    },
    "&: active": {
      backgroundColor: "#FEEFC3",
    },
  },
  darkActive: {
    backgroundColor: "#41331C",
    "&: hover": {
      backgroundColor: "#41331C",
    },
    "&: active": {
      backgroundColor: "#41331C",
    },
  },
};

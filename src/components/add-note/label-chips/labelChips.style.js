import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  labelsChips: {
    marginTop: "12px",
  },
  chip: {
    "& .MuiChip-deleteIcon": {
      display: "none",
    },
    "&:hover": {
      "& .MuiChip-deleteIcon": {
        display: "block",
      },
    },
  },
});

export const style = {
  chip: {
    fontSize: "11px",
  },
};

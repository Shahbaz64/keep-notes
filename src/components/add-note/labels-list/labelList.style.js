import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  innerText: {
    "& .MuiTypography-root": { fontSize: "14px" },
  },
});

export const style = {
  list: {
    width: "220px",
    padding: "4px 0px",
  },
  listItem: {
    padding: "0px 8px",
    marginTop: "2px",
  },
  itemText: {
    marginLeft: "10px",
    fontWeight: "bold",
  },
};

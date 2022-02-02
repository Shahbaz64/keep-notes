import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from "@mui/material";
import { useStyles, style } from "components/note/note.style";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Note = ({ title, text, color }) => {
  const classes = useStyles();
  return (
    <Card
      variant="outlined"
      className={classes.noteCard}
      sx={{ ...style.card }}
    >
      <div style={{ backgroundColor: `${color}` }}>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: "subtitle2" }}
        />
        <CardContent className={classes.innerText}>
          <Typography variant="body2">{text} </Typography>
        </CardContent>
        <div className={classes.actions}>
          <IconButton sx={{ ...style.icons }}>
            <PaletteOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ ...style.icons }}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

Note.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Note;

import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useStyles } from "components/note/note.style";
import PropTypes from "prop-types";

const Note = ({ title, text, color }) => {
  const classes = useStyles();
  return (
    <Card
      variant="outlined"
      className={classes.noteCard}
      sx={{ borderRadius: "10px" }}
    >
      <div style={{ backgroundColor: `${color}` }}>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: "subtitle2" }}
        />
        <CardContent className={classes.innerText}>
          <Typography variant="body2">{text} </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

Note.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

Note.defaultProps = {
  title: "",
  text: "",
  color: "",
};

export default Note;

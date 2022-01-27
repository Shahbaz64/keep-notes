import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useStyles } from "components/note/note.style";
import PropTypes from "prop-types";

const Note = ({ title, text }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.note}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "subtitle2" }}
      />
      <CardContent className={classes.innerText}>
        <Typography variant="body2">{text} </Typography>
      </CardContent>
    </Card>
  );
};

Note.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Note.defaultProps = {
  title: "",
  text: "",
};

export default Note;

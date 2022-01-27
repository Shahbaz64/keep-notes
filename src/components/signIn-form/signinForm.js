import React from "react";
import { Card, Avatar, Typography, Button } from "@mui/material";
import { useStyles } from "components/signIn-form/signinForm.style";
import { ReactComponent as GoogleIcon } from "assets/google-icon.svg";
import keepImg from "assets/keep-notes.png";
import PropTypes from "prop-types";

const SigninForm = ({ handleSignIn }) => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <div className={classes.centerCard}>
        <Card className={classes.signInCard}>
          <div className={classes.header}>
            <Avatar variant="square" src={keepImg}></Avatar>
            <Typography variant="h6">Welcome to Notes!</Typography>
          </div>
          <div className={classes.subHeader}>
            <Typography variant="body2">
              Sign In your account and Start adding notes with us.
            </Typography>
          </div>
          <div className={classes.signInBtn}>
            <Button
              startIcon={<GoogleIcon />}
              variant="outlined"
              color="secondary"
              onClick={handleSignIn}
            >
              Sign In with google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

SigninForm.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};

SigninForm.defaultProps = {
  handleSignIn: () => {},
};

export default SigninForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "database/config-firebase";
import path from "utils/constants/path.constant";
import SnackBar from "components/snackbar/snackBar";
import SigninForm from "components/signIn-form/signinForm";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignInPage = () => {
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackBar = () => {
    setIsOpenSnackBar(false);
  };

  const signInHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(path.HOME);
    } catch (err) {
      setIsOpenSnackBar(true);
      console.error("Error!", err);
    }
  };
  return (
    <div>
      <SigninForm handleSignIn={signInHandler} />
      <SnackBar
        open={isOpenSnackBar}
        handleClose={handleCloseSnackBar}
        msg="Sign In with google Failed."
      />
    </div>
  );
};

export default SignInPage;

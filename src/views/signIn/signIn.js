import React from "react";
import { showSnackBar } from "store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "database/config-firebase";
import path from "utils/constants/path.constant";
import SnackBar from "components/snackbar/snackBar";
import SigninForm from "components/signIn-form/signinForm";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(navigate(path.HOME));
    } catch (err) {
      console.error("Error!", err);
      dispatch(showSnackBar());
    }
  };

  return (
    <div>
      <SigninForm handleSignIn={signInHandler} />
      <SnackBar msg="Sign In with google Failed." />
    </div>
  );
};

export default SignInPage;

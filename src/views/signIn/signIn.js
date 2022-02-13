import React from "react";
import { showSnackBar } from "store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "database/config-firebase";
import SnackBar from "components/snackbar/snackBar";
import SigninForm from "components/signIn-form/signinForm";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(navigate("/home"));
    } catch {
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

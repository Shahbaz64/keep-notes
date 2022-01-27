import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "database/config-firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import SigninForm from "components/signIn-form/signinForm";
import SnackBar from "components/snackbar/snackBar";
import { signInUser, showSnackBar } from "store";
import { setUserId } from "store/notes-slice/notes.slice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      dispatch(
        signInUser({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        })
      );
      dispatch(setUserId(res.user.uid));
      navigate("/home");
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

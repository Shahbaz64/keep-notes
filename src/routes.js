import {
  signInUser,
  toggleLoading,
  setUserId,
  getNotes,
  getLabels,
} from "store";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "Layout";
import Bin from "views/bin/bin";
import Home from "views/home/home";
import SignIn from "views/signIn/signIn";
import React, { useEffect } from "react";
import { auth } from "database/config-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "components/progress-bar/progressBar";
import Label from "views/labels/Label";
import { getDeletedNotes } from "store";

const Routers = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.user.userId);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          signInUser({
            userId: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        dispatch(setUserId(user.uid));
        dispatch(getLabels(user.uid));
        dispatch(getNotes(user.uid));
        dispatch(getDeletedNotes(user.uid));
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, []);

  return isLoading ? (
    <ProgressBar />
  ) : (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={!userId ? <SignIn /> : <Navigate to="/home" />}
        />
        <Route
          exact
          path="/home"
          element={
            userId ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/bin"
          element={
            userId ? (
              <Layout>
                <Bin />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/labels/:labelName"
          element={
            userId ? (
              <Layout>
                <Label />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default Routers;

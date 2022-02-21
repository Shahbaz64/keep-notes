import { signInUser, toggleLoading, getNotes, getLabels } from "store";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "Layout";
import Bin from "views/bin/bin";
import Home from "views/home/home";
import Label from "views/labels/Label";
import Search from "views/search/search";
import SignIn from "views/signIn/signIn";
import React, { useEffect } from "react";
import { auth } from "database/config-firebase";
import path from "utils/constants/path.constant";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "components/progress-bar/progressBar";
import ErrorPage from "views/error/error";

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
        dispatch(getLabels(user.uid));
        dispatch(getNotes(user.uid));
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, []);

  if (isLoading) {
    return <ProgressBar />;
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path={path.SIGNIN}
          element={!userId ? <SignIn /> : <Navigate to={path.HOME} />}
        />
        <Route
          exact
          path={path.HOME}
          element={
            userId ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to={path.SIGNIN} />
            )
          }
        />
        <Route
          exact
          path={path.BIN}
          element={
            userId ? (
              <Layout>
                <Bin />
              </Layout>
            ) : (
              <Navigate to={path.SIGNIN} />
            )
          }
        />
        <Route
          exact
          path={`${path.LABELS}/:labelName`}
          element={
            userId ? (
              <Layout>
                <Label />
              </Layout>
            ) : (
              <Navigate to={path.SIGNIN} />
            )
          }
        />
        <Route
          exact
          path={path.SEARCH}
          element={
            userId ? (
              <Layout>
                <Search />
              </Layout>
            ) : (
              <Navigate to={path.SIGNIN} />
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default Routers;

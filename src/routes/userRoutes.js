import Layout from "layout/layout";
import Bin from "views/bin/bin";
import Home from "views/home/home";
import Label from "views/labels/Label";
import Search from "views/search/search";
import React, { useEffect } from "react";
import SignIn from "views/signIn/signIn";
import ErrorPage from "views/error/error";
import CustomRoutes from "routes/customRoute";
import { auth } from "database/config-firebase";
import path from "utils/constants/path.constant";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "components/progress-bar/progressBar";
import { signInUser, toggleLoading, getNotes, getLabels } from "store";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

const UserRoutes = () => {
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
        <Route exact path={path.SIGNIN} element={<SignIn />} />
        <Route element={<CustomRoutes userId={userId} />}>
          <Route
            path={path.HOME}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path={path.BIN}
            element={
              <Layout>
                <Bin />
              </Layout>
            }
          />
          <Route
            path={`${path.LABELS}/:labelName`}
            element={
              <Layout>
                <Label />
              </Layout>
            }
          />
          <Route
            path={path.SEARCH}
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default UserRoutes;

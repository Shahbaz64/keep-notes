import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "database/config-firebase";
import { setUserId, getNotes, getLabels } from "store";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "views/home/home";
import SignIn from "views/signIn/signIn";
import ProgressBar from "components/progress-bar/progressBar";

const Routers = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setLoading(false);
        dispatch(setUserId(user.uid));
        dispatch(getNotes(user.uid));
        dispatch(getLabels(user.uid));
      } else {
        setUser(false);
        setLoading(false);
      }
    });
  }, []);

  console.log(user);

  return loading ? (
    <ProgressBar />
  ) : (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/home" element={<Home authorized={user} />} />
      </Routes>
    </Router>
  );
};

export default Routers;

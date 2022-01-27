import { createSlice } from "@reduxjs/toolkit";
import { setDoc } from "firebase/firestore";
import { usersRef } from "database/config-firebase";
import { auth } from "database/config-firebase";
import { signOut } from "firebase/auth";

const userId = localStorage.getItem("id") ?? "";
const isLoggedIn = localStorage.getItem("user") ?? "";
const initialState = {
  isLoggedIn: isLoggedIn,
  user: {
    uid: userId,
    email: "",
    displayName: "",
    photoURL: "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      localStorage.setItem("user", true);
      state.isLoggedIn = true;
      state.user = action.payload;
      setDoc(usersRef(state.user.uid), {});
    },
    signOutUser: (state) => {
      localStorage.setItem("user", false);
      localStorage.setItem("id", "");
      state.isLoggedIn = false;
      signOut(auth);
    },
  },
});

export const { signInUser, signOutUser } = authSlice.actions;
export default authSlice.reducer;

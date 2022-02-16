import { signOut } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { userDocRef, auth } from "database/config-firebase";

const initialState = {
  isLoading: true,
  user: {
    userId: "",
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
      state.user = action.payload;
      setDoc(userDocRef(state.user.userId), {});
    },
    signOutUser: (state) => {
      signOut(auth);
      state.user.userId = "";
      state.user.email = "";
      state.user.displayName = "";
      state.user.photoURL = "";
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { signInUser, signOutUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;

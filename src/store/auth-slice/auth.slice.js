import { signOut } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { userDocRef, auth } from "database/config-firebase";

const initialState = {
  isLoading: true,
  user: {
    uid: "",
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
      setDoc(userDocRef(state.user.uid), {});
    },
    signOutUser: () => {
      signOut(auth);
    },
  },
});

export const { signInUser, signOutUser } = authSlice.actions;
export default authSlice.reducer;

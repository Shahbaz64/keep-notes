import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenInputBar: true,
  isOpenDrawer: true,
  isOpenSnackBar: false,
};

export const togglesSlice = createSlice({
  name: "togglesSlice",
  initialState,
  reducers: {
    showInputBar: (state) => {
      state.isOpenInputBar = true;
    },
    hideInputBar: (state) => {
      state.isOpenInputBar = false;
    },
    toggleDrawer: (state) => {
      if (state.isOpenDrawer === true) {
        state.isOpenDrawer = false;
      } else {
        state.isOpenDrawer = true;
      }
    },
    showSnackBar: (state) => {
      state.isOpenSnackBar = true;
    },
    hideSnackBar: (state) => {
      state.isOpenSnackBar = false;
    },
  },
});

export const {
  showInputBar,
  hideInputBar,
  toggleDrawer,
  showSnackBar,
  hideSnackBar,
} = togglesSlice.actions;
export default togglesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenInputBar: true,
  isOpenDrawer: true,
  toggleView: false,
  darkMode: false,
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
    toggleView: (state) => {
      if (state.toggleView === true) {
        state.toggleView = false;
      } else {
        state.toggleView = true;
      }
    },
    toggleMode: (state) => {
      if (state.darkMode === true) {
        state.darkMode = false;
      } else {
        state.darkMode = true;
      }
    },
  },
});

export const {
  showInputBar,
  hideInputBar,
  toggleDrawer,
  toggleMode,
  toggleView,
} = togglesSlice.actions;
export default togglesSlice.reducer;

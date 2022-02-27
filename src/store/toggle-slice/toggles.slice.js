import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenSideIconBar: false,
  isOpenDrawer: true,
  toggleView: false,
  darkMode: false,
};

export const togglesSlice = createSlice({
  name: "togglesSlice",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer;
      state.isOpenSideIconBar = !state.isOpenSideIconBar;
    },
    toggleView: (state) => {
      state.toggleView = !state.toggleView;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDrawer, toggleTheme, toggleView } = togglesSlice.actions;
export default togglesSlice.reducer;

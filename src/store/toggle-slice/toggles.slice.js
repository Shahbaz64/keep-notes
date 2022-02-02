import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenInputBar: true,
  isOpenDrawer: true,
  isOpenSnackBar: false,
  isOpenDialog: false,
  isOpenPopOver: false,
  toggleView: false,
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
    showDialog: (state) => {
      state.isOpenDialog = true;
    },
    hideDialog: (state) => {
      state.isOpenDialog = false;
    },
    showPopOver: (state) => {
      state.isOpenPopOver = true;
    },
    hidePopOver: (state) => {
      state.isOpenPopOver = false;
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
  toggleView,
  showSnackBar,
  hideSnackBar,
  showDialog,
  hideDialog,
  showPopOver,
  hidePopOver,
} = togglesSlice.actions;
export default togglesSlice.reducer;

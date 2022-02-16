import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenInputBar: true,
  isOpenDrawer: true,
  isOpenSnackBar: false,
  isOpenLabelDialog: false,
  isOpenNoteDialog: false,
  isOpenDeleteDialog: false,
  toggleView: false,
  mode: false,
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
    showLabelDialog: (state) => {
      state.isOpenLabelDialog = true;
    },
    hideLabelDialog: (state) => {
      state.isOpenLabelDialog = false;
    },
    showNoteDialog: (state) => {
      state.isOpenNoteDialog = true;
    },
    hideNoteDialog: (state) => {
      state.isOpenNoteDialog = false;
    },
    showDeleteDialog: (state) => {
      state.isOpenDeleteDialog = true;
    },
    hideDeleteDialog: (state) => {
      state.isOpenDeleteDialog = false;
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
      if (state.mode === true) {
        state.mode = false;
      } else {
        state.mode = true;
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
  toggleMode,
  toggleView,
  showSnackBar,
  hideSnackBar,
  showLabelDialog,
  hideLabelDialog,
  showNoteDialog,
  hideNoteDialog,
  showDeleteDialog,
  hideDeleteDialog,
} = togglesSlice.actions;
export default togglesSlice.reducer;

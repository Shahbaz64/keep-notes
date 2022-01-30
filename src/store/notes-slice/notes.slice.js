import { nanoid } from "nanoid";
import { deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { noteDocRef, labelDocRef } from "database/config-firebase";

const userId = localStorage.getItem("id") ?? "";
const initialState = {
  userId: userId,
  note: {
    title: "",
    text: "",
    color: "",
  },
  label: {
    name: "",
  },
  notes: [],
  labels: [],
  loading: true,
  isError: false,
  errorMsg: "",
};

export const notesSlice = createSlice({
  name: "notesSlice",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      localStorage.setItem("id", action.payload);
      state.userId = action.payload;
    },

    addNote: (state, action) => {
      state.note = action.payload;
      const docId = nanoid();
      setDoc(noteDocRef(state.userId, docId), state.note);
      state.notes = [...state.notes, state.note];
    },

    addLabel: (state, action) => {
      state.label.name = action.payload;
      const docId = nanoid();
      setDoc(labelDocRef(state.userId, docId), {
        name: action.payload,
      });
      state.labels = [...state.labels, { name: state.label.name, id: docId }];
    },

    updateLabel: (state, action) => {
      updateDoc(labelDocRef(state.userId, action.payload.labelId), {
        name: action.payload.labelName,
      });
      state.labels = state.labels.map((label) => {
        let newLabel = { ...label };
        if (newLabel.id === action.payload.labelId) {
          newLabel.name = action.payload.labelName;
        }
        return newLabel;
      });
    },

    getLabels: (state, action) => {
      state.labels = action.payload.labels;
      state.loading = false;
      state.isError = action.payload.isError;
      state.errorMsg = action.payload.errorMsg;
    },

    deleteLabel: (state, action) => {
      deleteDoc(labelDocRef(state.userId, action.payload.labelId));
      state.labels.map((label, index) => {
        if (label.id === action.payload.labelId) {
          return state.labels.splice(index, 1);
        }
      });
    },

    getNotes: (state, action) => {
      state.notes = action.payload.notes;
      state.loading = false;
      state.isError = action.payload.isError;
      state.errorMsg = action.payload.errorMsg;
    },
  },
});

export const {
  setUserId,
  addNote,
  getNotes,
  addLabel,
  getLabels,
  updateLabel,
  deleteLabel,
} = notesSlice.actions;
export default notesSlice.reducer;

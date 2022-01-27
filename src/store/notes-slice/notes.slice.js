import { v4 as uuid } from "uuid";
import { setDoc } from "firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { newNoteRef } from "database/config-firebase";

const userId = localStorage.getItem("id") ?? "";
const initialState = {
  userId: userId,
  note: {
    title: "",
    text: "",
  },
  notes: [],
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
      const docId = uuid();
      setDoc(newNoteRef(state.userId, docId), {
        title: state.note.title,
        text: state.note.text,
      });
      state.notes = [
        ...state.notes,
        { title: state.note.title, text: state.note.text, id: docId },
      ];
    },

    getNotes: (state, action) => {
      return {
        ...state,
        notes: action.payload.notes,
        loading: false,
        isError: action.payload.isError,
        errorMsg: action.payload.errorMsg,
      };
    },
  },
});

export const { setUserId, addNote, getNotes } = notesSlice.actions;
export default notesSlice.reducer;

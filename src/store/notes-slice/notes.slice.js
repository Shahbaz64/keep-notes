import { deleteDoc, updateDoc, getDocs, addDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  notesRef,
  labelsRef,
  labelDocRef,
  noteDocRef,
} from "database/config-firebase";

export const getNotes = createAsyncThunk("getNotes", async (userId) => {
  const response = await getDocs(notesRef(userId));
  const notes = response.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return notes;
});

export const getLabels = createAsyncThunk("getLabels", async (userId) => {
  const response = await getDocs(labelsRef(userId));
  const labels = response.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return labels;
});

export const addLabel = createAsyncThunk("addLabel", async (data) => {
  const { userId, label } = data;
  const response = await addDoc(labelsRef(userId), {
    name: label,
  });
  const newLabel = { name: label, id: response.id };
  return newLabel;
});

export const addNote = createAsyncThunk("addNote", async (data) => {
  const { userId, title, text, color } = data;
  const response = await addDoc(notesRef(userId), {
    title: title,
    text: text,
    color: color,
  });
  const newNote = { title: title, text: text, color: color, id: response.id };
  return newNote;
});

const initialState = {
  userId: "",
  notes: [],
  labels: [],
  loading: true,
  isError: false,
  errorMsg: "",
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: {
    [getNotes.pending]: (state) => {
      state.loading = true;
    },
    [getNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    [getNotes.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.errorMsg = "ERROR getting Notes";
    },

    [getLabels.pending]: (state) => {
      state.loading = true;
    },
    [getLabels.fulfilled]: (state, action) => {
      state.loading = false;
      state.labels = action.payload;
    },
    [getLabels.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.errorMsg = "ERROR getting Notes";
    },

    [addLabel.pending]: (state) => {
      state.loading = false;
    },
    [addLabel.fulfilled]: (state, action) => {
      state.loading = false;
      state.labels = [...state.labels, action.payload];
    },
    [addLabel.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.errorMsg = "ERROR adding Labels";
    },

    [addNote.pending]: (state) => {
      state.loading = false;
    },
    [addNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = [...state.notes, action.payload];
    },
    [addNote.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
      state.errorMsg = "ERROR adding Labels";
    },
  },

  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
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

    deleteLabel: (state, action) => {
      deleteDoc(labelDocRef(state.userId, action.payload.labelId));
      state.labels.map((label, index) => {
        if (label.id === action.payload.labelId) {
          return state.labels.splice(index, 1);
        }
      });
    },

    deleteNote: (state, action) => {
      deleteDoc(noteDocRef(state.userId, action.payload.noteId));
      state.notes.map((note, index) => {
        if (note.id === action.payload.noteId) {
          return state.notes.splice(index, 1);
        }
      });
    },
  },
});

export const { setUserId, updateLabel, deleteLabel, deleteNote } =
  notesSlice.actions;
export default notesSlice.reducer;

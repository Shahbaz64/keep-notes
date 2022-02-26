import { getDocs, addDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesRef, labelsRef } from "database/config-firebase";

const initialState = {
  notes: [],
  labels: [],
  searchTerm: "",
  errorMsg: "",
  loading: true,
  appBarHeader: "Notes",
};

export const getNotes = createAsyncThunk("getNotes", async (userId) => {
  try {
    const response = await getDocs(notesRef(userId));
    const notes = response.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return notes;
  } catch (err) {
    return err;
  }
});

export const getLabels = createAsyncThunk("getLabels", async (userId) => {
  try {
    const response = await getDocs(labelsRef(userId));
    const labels = response.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return labels;
  } catch (err) {
    return err;
  }
});

export const addLabel = createAsyncThunk("addLabel", async (data) => {
  try {
    const { userId, label } = data;
    const response = await addDoc(labelsRef(userId), {
      name: label,
    });
    const newLabel = { name: label, id: response.id };
    return newLabel;
  } catch (err) {
    return err;
  }
});

export const addNote = createAsyncThunk("addNote", async (data) => {
  try {
    const { userId, title, text, color, isDeleted, labels } = data;
    const response = await addDoc(notesRef(userId), {
      title: title,
      text: text,
      color: color,
      isDeleted: isDeleted,
      labels: labels.map((label) => {
        return { id: label.id, name: label.name };
      }),
    });

    const newNote = {
      id: response.id,
      title: title,
      text: text,
      color: color,
      isDeleted: isDeleted,
      labels: labels.map((label) => {
        return { id: label.id, name: label.name };
      }),
    };
    return newNote;
  } catch (err) {
    return err;
  }
});

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
    [getNotes.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },

    [getLabels.pending]: (state) => {
      state.loading = true;
    },
    [getLabels.fulfilled]: (state, action) => {
      state.loading = false;
      state.labels = action.payload;
    },
    [getLabels.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },

    [addLabel.pending]: (state) => {
      state.loading = false;
    },
    [addLabel.fulfilled]: (state, action) => {
      state.loading = false;
      state.labels = [...state.labels, action.payload];
    },
    [addLabel.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },

    [addNote.pending]: (state) => {
      state.loading = false;
    },
    [addNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = [...state.notes, action.payload];
    },
    [addNote.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
  },

  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setAppBarHeader: (state, action) => {
      state.appBarHeader = action.payload;
    },

    updateLabel: (state, action) => {
      state.labels.map((label) => {
        if (label.id === action.payload.labelId) {
          label.name = action.payload.labelName;
        }
      });

      state.notes?.map((note) => {
        note.labels?.map((label) => {
          if (label.id === action.payload.labelId) {
            label.name = action.payload.labelName;
          }
        });
      });
    },

    updateNoteColor: (state, action) => {
      state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          note.color = action.payload.color;
        }
      });
    },

    updateNote: (state, action) => {
      state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          note.title = action.payload.title;
          note.text = action.payload.text;
          note.color = action.payload.color;
          note.labels = action.payload.labels.map((label) => {
            return { id: label.id, name: label.name };
          });
        }
      });
    },

    deleteLabel: (state, action) => {
      state.labels.map((label, index) => {
        if (label.id === action.payload.labelId) {
          return state.labels.splice(index, 1);
        }
      });

      state.notes.map((note) => {
        note.labels?.map((label, index) => {
          if (label.id === action.payload.labelId) {
            return note.labels.splice(index, 1);
          }
        });
      });
    },

    deleteNote: (state, action) => {
      state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          note.isDeleted = true;
        }
      });
    },

    deleteLabelsFromNote: (state, action) => {
      state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          note.labels.map((label, index) => {
            if (label.id === action.payload.labelId) {
              return note.labels.splice(index, 1);
            }
          });
        }
      });
    },

    deleteAllNotes: (state) => {
      state.notes = state.notes.filter((note) => {
        return note.isDeleted !== true;
      });
    },

    deleteNoteForever: (state, action) => {
      state.notes.map((note, index) => {
        if (note.id === action.payload.noteId) {
          return state.notes.splice(index, 1);
        }
      });
    },

    restoreNote: (state, action) => {
      state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          note.isDeleted = false;
        }
      });
    },
  },
});

export const {
  updateNoteColor,
  deleteLabelsFromNote,
  deleteNoteFromLabels,
  updateNote,
  setUserId,
  setSearchTerm,
  setAppBarHeader,
  updateLabel,
  deleteLabel,
  deleteNote,
  deleteAllNotes,
  deleteNoteForever,
  restoreNote,
} = notesSlice.actions;
export default notesSlice.reducer;

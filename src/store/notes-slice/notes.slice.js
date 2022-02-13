import {
  deleteDoc,
  updateDoc,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  notesRef,
  labelsRef,
  labelDocRef,
  noteDocRef,
  deletedNotesRef,
  deletedNoteDocRef,
} from "database/config-firebase";

const initialState = {
  userId: "",
  notes: [],
  labels: [],
  deletedNotes: [],
  loading: true,
  labelChips: [],
  error: { isError: false, errorMsg: "" },
};

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

export const getDeletedNotes = createAsyncThunk(
  "getDeletedNotes",
  async (userId) => {
    const response = await getDocs(deletedNotesRef(userId));
    const notes = response.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return notes;
  }
);

export const addLabel = createAsyncThunk("addLabel", async (data) => {
  const { userId, label } = data;
  const response = await addDoc(labelsRef(userId), {
    name: label,
  });
  const newLabel = { name: label, id: response.id };
  return newLabel;
});

export const addNote = createAsyncThunk("addNote", async (data) => {
  const { userId, title, text, color, labels } = data;
  const response = await addDoc(notesRef(userId), {
    title: title,
    text: text,
    color: color,
    labels: labels.map((label) => {
      return { id: label.id, name: label.name };
    }),
  });

  const newNote = {
    id: response.id,
    title: title,
    text: text,
    color: color,
    labels: labels.map((label) => {
      return { id: label.id, name: label.name };
    }),
  };
  return newNote;
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
    [getNotes.rejected]: (state) => {
      state.loading = false;
      state.error.isError = true;
      state.error.errorMsg = "ERROR getting Notes";
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
      state.error.isError = true;
      state.error.errorMsg = "ERROR getting Notes";
    },

    [getDeletedNotes.pending]: (state) => {
      state.loading = true;
    },
    [getDeletedNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletedNotes = action.payload;
    },
    [getDeletedNotes.rejected]: (state) => {
      state.loading = false;
      state.error.isError = true;
      state.error.errorMsg = "ERROR getting Notes";
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
      state.error.isError = true;
      state.error.errorMsg = "ERROR adding Labels";
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
      state.error.isError = true;
      state.error.errorMsg = "ERROR adding Notes";
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

      state.labels.map((label) => {
        if (label.id === action.payload.labelId) {
          label.name = action.payload.labelName;
        }
      });

      state.notes.map((note) => {
        note.labels.map((label) => {
          if (label.id === action.payload.labelId) {
            label.name = action.payload.labelName;
            updateDoc(
              noteDocRef(state.userId, note.id),
              {
                labels: [...note.labels],
              },
              { merge: true }
            );
          }
        });
      });
    },

    updateNoteColor: (state, action) => {
      updateDoc(noteDocRef(state.userId, action.payload.noteId), {
        color: action.payload.color,
      });
      state.notes = state.notes.map((note) => {
        let newNote = { ...note };
        if (newNote.id === action.payload.noteId) {
          newNote.color = action.payload.color;
        }
        return newNote;
      });
    },

    updateNote: (state, action) => {
      const newNote = {
        title: action.payload.title,
        text: action.payload.text,
        color: action.payload.color,
        labels: action.payload.labels.map((label) => {
          return { id: label.id, name: label.name };
        }),
      };
      updateDoc(noteDocRef(state.userId, action.payload.noteId), {
        ...newNote,
      });

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
      deleteDoc(labelDocRef(state.userId, action.payload.labelId));
      state.labels.map((label, index) => {
        if (label.id === action.payload.labelId) {
          return state.labels.splice(index, 1);
        }
      });

      state.notes.map((note) => {
        note.labels.map((label, index) => {
          if (label.id === action.payload.labelId) {
            const newLabels = note.labels.filter(
              (label) => label.id !== action.payload.labelId
            );
            updateDoc(noteDocRef(state.userId, note.id), {
              labels: newLabels,
            });
            return note.labels.splice(index, 1);
          }
        });
      });
    },

    deleteNote: (state, action) => {
      state.notes.map((note, index) => {
        if (note.id === action.payload.noteId) {
          const deletedNote = {
            title: note.title,
            text: note.text,
            color: note.color,
            labels: note.labels,
          };
          state.deletedNotes.push({ ...deletedNote, id: note.id });
          setDoc(deletedNoteDocRef(state.userId, note.id), {
            ...deletedNote,
          });
          return state.notes.splice(index, 1);
        }
      });
      deleteDoc(noteDocRef(state.userId, action.payload.noteId));
    },

    addLabelChips: (state, action) => {
      state.labelChips.push(action.payload);
    },

    emptyLabelChips: (state) => {
      state.labelChips = [];
    },

    removeLabelChip: (state, action) => {
      state.labelChips = state.labelChips.filter(
        (label) => label.id !== action.payload
      );
    },

    deleteLabelsFromNote: (state, action) => {
      state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          const newLabels = note.labels.filter(
            (label) => label.id !== action.payload.labelId
          );
          note.labels.map((label, index) => {
            if (label.id === action.payload.labelId) {
              return note.labels.splice(index, 1);
            }
          });
          updateDoc(noteDocRef(state.userId, action.payload.noteId), {
            labels: newLabels,
          });
        }
      });
    },

    deleteAllNotes: (state) => {
      state.deletedNotes.map((note) => {
        deleteDoc(deletedNoteDocRef(state.userId, note.id));
      });
      state.deletedNotes = [];
    },

    deleteNoteForever: (state, action) => {
      state.deletedNotes.map((note, index) => {
        if (note.id == action.payload) {
          return state.deletedNotes.splice(index, 1);
        }
      });
      deleteDoc(deletedNoteDocRef(state.userId, action.payload));
    },

    restoreNote: (state, action) => {
      state.deletedNotes.map((note, index) => {
        if (note.id == action.payload.noteId) {
          state.notes.push(note);
          setDoc(noteDocRef(state.userId, action.payload.noteId), {
            title: note.title,
            text: note.text,
            color: note.color,
            labels: note.labels,
          });
          deleteDoc(deletedNoteDocRef(state.userId, action.payload.noteId));
          return state.deletedNotes.splice(index, 1);
        }
      });
    },
  },
});

export const {
  updateNoteColor,
  addLabelChips,
  emptyLabelChips,
  removeLabelChip,
  deleteLabelsFromNote,
  deleteNoteFromLabels,
  updateNote,
  setUserId,
  updateLabel,
  deleteLabel,
  deleteNote,
  deleteAllNotes,
  deleteNoteForever,
  restoreNote,
} = notesSlice.actions;
export default notesSlice.reducer;

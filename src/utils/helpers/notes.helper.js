import { updateDoc, deleteDoc } from "firebase/firestore";
import { labelDocRef, noteDocRef } from "database/config-firebase";
import { store } from "store/store";
import {
  updateLabel,
  updateNoteColor,
  deleteLabel,
  updateNote,
  deleteNote,
  restoreNote,
  deleteLabelsFromNote,
  deleteAllNotes,
  deleteNoteForever,
} from "store";

const UPDATELABEL = async (userId, labelId, labelName) => {
  try {
    await updateDoc(labelDocRef(userId, labelId), {
      name: labelName,
    });
  } catch (err) {
    console.error(err);
  }
  store.dispatch(updateLabel({ userId, labelId, labelName }));
};

const UPDATELABELFROMNOTES = async (userId, noteId, newLabels) => {
  try {
    await updateDoc(
      noteDocRef(userId, noteId),
      {
        labels: [...newLabels],
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
};

const UPDATENOTE = async (userId, noteId, newNote) => {
  const { title, text, color, labels } = newNote;
  try {
    await updateDoc(
      noteDocRef(userId, noteId),
      {
        title: title,
        text: text,
        color: color,
        labels: labels,
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
  store.dispatch(updateNote({ noteId, title, text, color, labels }));
};

const UPDATENOTECOLOR = async (userId, noteId, color) => {
  try {
    await updateDoc(noteDocRef(userId, noteId), {
      color: color,
    });
  } catch (err) {
    console.error(err);
  }
  store.dispatch(updateNoteColor({ userId, noteId, color }));
};

const DELETELABEL = async (userId, labelId) => {
  try {
    await deleteDoc(labelDocRef(userId, labelId));
  } catch (err) {
    console.error(err);
  }
  store.dispatch(deleteLabel({ userId, labelId }));
};

const DELETESPECIFICLABELFROMNOTES = async (userId, noteId, newLabels) => {
  try {
    await updateDoc(noteDocRef(userId, noteId), {
      labels: [...newLabels],
    });
  } catch (err) {
    console.error(err);
  }
};

const DELETELABELFROMNOTE = async (userId, labelId, noteId, newLabels) => {
  try {
    await updateDoc(noteDocRef(userId, noteId), {
      labels: [...newLabels],
    });
  } catch (err) {
    console.error(err);
  }
  store.dispatch(deleteLabelsFromNote({ noteId, labelId }));
};

const DELETENOTE = async (userId, noteId) => {
  try {
    await updateDoc(
      noteDocRef(userId, noteId),
      {
        isDeleted: true,
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
  store.dispatch(deleteNote({ noteId }));
};

const DELETEALLNOTES = async (userId, noteId) => {
  try {
    deleteDoc(noteDocRef(userId, noteId));
  } catch (err) {
    console.error(err);
  }
  store.dispatch(deleteAllNotes());
};

const DELETENOTEFOREVER = async (userId, noteId) => {
  try {
    await deleteDoc(noteDocRef(userId, noteId));
  } catch (err) {
    console.error(err);
  }
  store.dispatch(deleteNoteForever({ noteId }));
};

const RESTORENOTE = async (userId, noteId) => {
  try {
    await updateDoc(
      noteDocRef(userId, noteId),
      {
        isDeleted: false,
      },
      { merge: true }
    );
  } catch (err) {
    console.error(err);
  }
  store.dispatch(restoreNote({ noteId }));
};

export default {
  UPDATELABEL,
  UPDATELABELFROMNOTES,
  UPDATENOTE,
  UPDATENOTECOLOR,
  DELETELABEL,
  DELETESPECIFICLABELFROMNOTES,
  DELETENOTE,
  DELETELABELFROMNOTE,
  DELETEALLNOTES,
  DELETENOTEFOREVER,
  RESTORENOTE,
};

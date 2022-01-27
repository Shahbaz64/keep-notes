import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { doc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getNotes } from "store";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getAllNotes = (userId) => async (dispatch) => {
  try {
    const snapshot = await getDocs(notesRef(userId));
    const notes = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    dispatch(getNotes({ notes }));
  } catch (err) {
    dispatch(
      getNotes({
        notes: [],
        isError: true,
        errorMsg: err.message,
      })
    );
  }
};

export const usersRef = (userId) => {
  return doc(db, "users", userId);
};

export const notesRef = (userId) => {
  return collection(db, "users", userId, "notes");
};

export const newNoteRef = (userId, noteId) => {
  return doc(db, "users", userId, "notes", noteId);
};

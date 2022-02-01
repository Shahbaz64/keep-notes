import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { doc, collection, getFirestore } from "firebase/firestore";
// import { addLabel } from "store";

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

// export const addnewLabel = (userId, label) => async (dispatch) => {
//   const labelDoc = await addDoc(labelDocRef(userId), {
//     name: label,
//   });
//   dispatch(addLabel({ id: labelDoc.id, label: label }));
// };

export const userDocRef = (userId) => {
  return doc(db, "users", userId);
};

export const notesRef = (userId) => {
  return collection(db, "users", userId, "notes");
};

export const labelsRef = (userId) => {
  return collection(db, "users", userId, "labels");
};

export const labelDocRef = (userId, docId) => {
  return doc(db, "users", userId, "labels", docId);
};

// export const noteDocRef = (userId, docId) => {
//   return doc(db, "users", userId, "notes", docId);
// };

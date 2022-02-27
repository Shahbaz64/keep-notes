import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { doc, collection, getFirestore } from "firebase/firestore";
import collections from "utils/constants/collections.constant";

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

export const userDocRef = (userId) => {
  return doc(db, collections.USERS, userId);
};

export const notesRef = (userId) => {
  return collection(db, collections.USERS, userId, collections.NOTES);
};

export const labelsRef = (userId) => {
  return collection(db, collections.USERS, userId, collections.LABELS);
};

export const labelDocRef = (userId, docId) => {
  return doc(db, collections.USERS, userId, collections.LABELS, docId);
};

export const noteDocRef = (userId, docId) => {
  return doc(db, collections.USERS, userId, collections.NOTES, docId);
};

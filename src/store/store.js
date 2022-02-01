import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "store/auth-slice/auth.slice";
import notesSlice from "store/notes-slice/notes.slice";
import togglesSlice from "store/toggle-slice/toggles.slice";

const rootReducer = combineReducers({
  authReducer: authSlice,
  notesReducer: notesSlice,
  toggleReducer: togglesSlice,
});

export const store = configureStore({ reducer: rootReducer });

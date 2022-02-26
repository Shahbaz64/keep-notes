import { setDoc } from "firebase/firestore";
import { store } from "store/store";
import { userDocRef, auth } from "database/config-firebase";
import { signInUser } from "store";
import { signOut } from "firebase/auth";
import { signOutUser } from "store";

const SIGNINUSER = (user) => {
  setDoc(userDocRef(user.userId), {});
  store.dispatch(signInUser(user));
};

const SIGNOUTUSER = () => {
  signOut(auth);
  store.dispatch(signOutUser());
};

export default { SIGNINUSER, SIGNOUTUSER };

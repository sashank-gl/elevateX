import { useEffect, useState } from "react";
import { useContext, createContext } from "react";

import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firebaseApp, firebaseDB } from "../firebaseConfig";

const auth = getAuth(firebaseApp);
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // await signInWithRedirect(auth, provider);

      const uid = result.user.uid;
      // const docRef = await addDoc(collection(firebaseDB, "users"), { uid });
      // const docRef = collection(firebaseDB, "users").doc(uid);
      // await setDoc(docRef, { uid }, { merge: true });

      console.log("User Document created in Firestore", uid);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      await signOut(auth);
      console.log("Sign Out Successful");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

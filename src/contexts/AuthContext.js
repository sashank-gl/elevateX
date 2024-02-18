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
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseApp, firebaseDB } from "../firebaseConfig";

const auth = getAuth(firebaseApp);
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const docRef = doc(firebaseDB, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFirebaseUser(docSnap.data());
          // Alternatively, store specific fields if needed.
        } else {
          console.log("No user data found in Firestore");
          // Optionally create a new user document here.
        }
      } else {
        setFirebaseUser(null);
      }
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
    <AuthContext.Provider
      value={{ user, firebaseUser, signInWithGoogle, signOutWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

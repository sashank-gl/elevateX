import { useEffect, useState } from "react";
import { useContext, createContext } from "react";

import {
  getAuth,
  signInWithPopup,
  // signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseApp, firebaseDB } from "../firebaseConfig";

const auth = getAuth(firebaseApp);
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const docRef = doc(firebaseDB, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData);
        } else {
          console.log("No user data found in Firestore");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { uid, email, displayName } = user;
      const userDocRef = doc(collection(firebaseDB, "users"), uid);

      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setUser(userData);
      } else {
        await setDoc(userDocRef, { uid, email, displayName, isPublic: false });
        setUser({ uid, email, displayName, isPublic: false });
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      await signOut(auth);
      setUser(null);
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

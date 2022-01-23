import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const signup = async (email, password) => {
    //console.log("signup", email, password);
    let user = {};
    try {
      user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error al crear cuenta (email, password)", error);
    }
    return user;
    //return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = async (email, password) => {
    //console.log("signIn", email, password);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => auth.signOut();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setCurrentUser(user);
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log("email response", res);
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        /*const errorCode = error.code;
        const errorMessage = error.message;*/
        console.log("email sent error", error);
      });
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    signInWithGoogle,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

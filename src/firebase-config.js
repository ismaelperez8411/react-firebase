import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOtGabnhG5pBSwfk-D5KEKMCNfZuMHcnA",
  authDomain: "exam-5facf.firebaseapp.com",
  projectId: "exam-5facf",
  storageBucket: "exam-5facf.appspot.com",
  messagingSenderId: "619640826920",
  appId: "1:619640826920:web:b65f11c80f9922da0b991d",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

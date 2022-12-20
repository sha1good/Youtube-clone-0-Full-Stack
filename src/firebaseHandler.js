import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "video-12fe1.firebaseapp.com",
  projectId: "video-12fe1",
  storageBucket: "video-12fe1.appspot.com",
  messagingSenderId: "4756506734",
  appId: "1:4756506734:web:23f22250b2b94bf06f7e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

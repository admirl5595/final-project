// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDIHEPO5AyxT9gbu0ll2eaiRcgF43Z0wg",
  authDomain: "final-project-54908.firebaseapp.com",
  databaseURL:
    "https://final-project-54908-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-project-54908",
  storageBucket: "final-project-54908.appspot.com",
  messagingSenderId: "839133418558",
  appId: "1:839133418558:web:50577c6b341ff6271b2d6f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

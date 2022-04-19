// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIDqDNrDHfOtE-w38c7-vJpACEF2AT1IA",
  authDomain: "final-project-306b6.firebaseapp.com",
  projectId: "final-project-306b6",
  storageBucket: "final-project-306b6.appspot.com",
  messagingSenderId: "977478365445",
  appId: "1:977478365445:web:a79bf24ae79d2ecc2ec76c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

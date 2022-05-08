import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc
} from "firebase/firestore";

import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { db, auth } from "../../firebase-config";

import InsertObservationScreen from "../screens/InsertObservationScreen";

export async function getRooms(setRooms) {

  // get user's habits collection (users/userId/habits)
  const querySnapshot = await getDocs(collection(db, "rooms"));
  const rooms = querySnapshot.docs.map((doc) => doc.data());

  setRooms(rooms)
};



export async function getObservations() {
  // patients/SSN/observations[]
  const querySnapshot = collection(db, "patients", "123", "observations");

  const observations = querySnapshot.docs.map((doc) => doc.data());

  // setObservations(observations);
}




export async function postObservation(newobservationInfo, pId) {
  // Get db 
  const querySnapshot = doc(db, "patients", pId);

  await updateDoc(querySnapshot, {
    observations: arrayUnion(newobservationInfo)
  });
}
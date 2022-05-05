import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { db, auth } from "../../firebase-config";

export const getRooms = async (setRooms) => {

  // get user's habits collection (users/userId/habits)
  const querySnapshot = await getDocs(collection(db, "rooms"));
  const rooms = querySnapshot.docs.map((doc) => doc.data());

  setRooms(rooms)
  };

import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../../firebase-config";

export async function getRooms(setRooms) {
  // get user's habits collection (users/userId/habits)
  const querySnapshot = await getDocs(collection(db, "rooms"));
  const rooms = querySnapshot.docs.map((doc) => doc.data());

  setRooms(rooms);
}

export async function postObservation(newobservationInfo, pId) {
  // Get db
  const querySnapshot = doc(db, "patients", pId);

  await updateDoc(querySnapshot, {
    observations: arrayUnion(newobservationInfo),
  });
}

export async function getEmployees(setEmployees) {
  const querySnapshot = await getDocs(collection(db, "users"));
  const employees = querySnapshot.docs.map((doc) => doc.data());

  console.log(employees);

  setEmployees(employees);
}

export async function postEmployee(employee) {
  (await addDoc(collection(db, "patients"), employee)).then()
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

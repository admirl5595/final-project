import {
  addDoc,
  setDoc,
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
  const rooms = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

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

  setEmployees(employees);
}

export async function updateEmployee(employee) {
  console.log(employee);
  const docRef = doc(db, "users", employee.employeeNumber);
  const res = await setDoc(docRef, employee);
}

import React, { useState, useContext, useEffect } from "react";

import { db } from "./firebase-config";
import { LogBox } from "react-native";
// prevent annoying yellow warning
LogBox.ignoreLogs(["Setting a timer"]);

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  documentId,
  getDocs,
} from "firebase/firestore";

import * as Notifications from "expo-notifications";
import PatientContext from "./config/PatientContext";

import { addIcons } from "./src/res/icons/fontAwsome";

import ScreenSwitcher from "./src/screens/ScreenSwitcher";

// icons
// TODO: Test om den virker
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  addIcons();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setupSnapshot(setPatients);
  }, []);

  // conditional rendering of screens
  return (
    <PatientContext.Provider value={{ patients, setPatients }}>
      <ScreenSwitcher />
    </PatientContext.Provider>
  );
};

export default App;

async function setupSnapshot(setPatients) {
  const collectionRef = collection(db, "rooms");

  const roomsCollection = await getDocs(collectionRef);

  let rooms = roomsCollection.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let patientIds = rooms.map((room) => room.patientId);

  console.log("patient ids");
  console.log(patientIds);

  const q = query(
    collection(db, "patients"),
    where(documentId(), "in", patientIds)
  );

  onSnapshot(q, (snapshot) => {
    console.log("Patient:");

    snapshot.docChanges().forEach((change) => {
      let patient = change.doc.data();

      console.log("change type: " + change.type);
      // console.log(patient);

      // add patient to state
      if (change.type === "added") {
        // TODO: add to global context

        // filter by 50 latest vitals into stack

        patient.breathRate = patient.breathRate.slice(-50);
        patient.diastolicBP = patient.diastolicBP.slice(-50);
        patient.heartRate = patient.heartRate.slice(-50);
        patient.o2Level = patient.o2Level.slice(-50);
        patient.systolicBP = patient.systolicBP.slice(-50);

        console.log("edited patient");
        console.log(patient.breathRate.length);

        // add new patient to global context
        setPatients((prevPatients) => [...prevPatients, patient]);
      }
      // update vitals
      if (change.type === "modified") {
        // TODO: pop and push new vital to context
        // check for abnormalities and trigger notification
      }
      // redirect to rooms page
      if (change.type === "removed") {
        // TODO: redirect to home screen if we're already inside the patient

        navigation.navigate("HomeScreen");
      }
    });
  });
}

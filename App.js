import React, { useState, useContext, useEffect } from "react";
import Monitor from "./src/screens/Monitor";

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
import RoomContext from "./config/RoomContext";

import { addIcons } from "./src/res/icons/fontAwsome";

import ScreenSwitcher from "./src/screens/ScreenSwitcher";

import { useRoute } from "@react-navigation/native";

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
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setupSnapshot(setPatients);
  }, []);

  // conditional rendering of screens
  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      <PatientContext.Provider value={{ patients, setPatients }}>
        <ScreenSwitcher />
      </PatientContext.Provider>
    </RoomContext.Provider>
  );
};

export default App;

async function setupSnapshot(setPatients) {
  const q = query(collection(db, "patients"), where("admitted", "==", true));

  onSnapshot(q, (snapshot) => {
    console.log("Patient:");

    snapshot.docChanges().forEach((change) => {
      // get id of document
      let id = change.doc.id;
      // get document data
      let patient = change.doc.data();

      // add id to patient object
      patient = { id, ...patient };
      console.log("change type: " + change.type);

      // add patient to state
      if (change.type === "added") {
        // TODO: add to global context

        // filter by 50 latest vitals into stack

        patient.breathRate = patient.breathRate.slice(-50);
        patient.diastolicBP = patient.diastolicBP.slice(-50);
        patient.heartRate = patient.heartRate.slice(-50);
        patient.o2Level = patient.o2Level.slice(-50);
        patient.systolicBP = patient.systolicBP.slice(-50);

        // add new patient to global context
        setPatients((prevPatients) => [...prevPatients, patient]);
      }
      // update vitals
      if (change.type === "modified") {
        // TODO: pop and push new vital to context
        // note: we have all the data points so might as well slice again

        patient.breathRate = patient.breathRate.slice(-30);
        patient.diastolicBP = patient.diastolicBP.slice(-50);
        patient.heartRate = patient.heartRate.slice(-50);
        patient.o2Level = patient.o2Level.slice(-50);
        patient.systolicBP = patient.systolicBP.slice(-50);

        console.log(
          "value in app: " +
            patient.systolicBP[patient.systolicBP.length - 1].value
        );

        // add new patient to global context
        setPatients((prevPatients) => {
          // remove outdated patient object
          let newPatients = prevPatients.filter(
            (oldPatient) => oldPatient.id !== patient.id
          );
          // replace with updated patient object
          newPatients.push(patient);

          return newPatients;
        });

        // check for abnormalities and trigger notification

        // later...
      }
      // redirect to rooms page
      if (change.type === "removed") {
        // TODO: redirect to home screen if we're already inside the patient
        // later...
        navigation.navigate("HomeScreen");
      }
    });
  });
}

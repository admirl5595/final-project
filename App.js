import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import notificationSetup from "./src/services/notifications/notifications-setup";

import { db } from "./firebase-config";
import { LogBox } from "react-native";
// prevent annoying yellow warning
LogBox.ignoreLogs(["Setting a timer"]);

import { collection, query, where, onSnapshot } from "firebase/firestore";

import * as Notifications from "expo-notifications";
import PatientContext from "./src/services/PatientContext";
import RoomContext from "./src/services/RoomContext";
import triggerAbnormalVitalNotifcation from "src/services/notifications/notifications";

import { addIcons } from "./src/res/icons/fontAwsome";

import RootNavigator from "./src/services/routes/rootNavigator";

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
    // setup listening for realtime changes in firestore database
    setupSnapshot(setPatients);
    // setup notifications
    notificationSetup(notificationListener, responseListener);
  }, []);

  const notificationListener = useRef();
  const responseListener = useRef();

  // conditional rendering of screens
  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      <PatientContext.Provider value={{ patients, setPatients }}>
        <RootNavigator />
      </PatientContext.Provider>
    </RoomContext.Provider>
  );
};

export default App;

async function setupSnapshot(setPatients) {
  const q = query(collection(db, "patients"), where("admitted", "==", true));

  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      // get id of document
      let id = change.doc.id;
      // get document data
      let patient = change.doc.data();

      // add id to patient object
      patient = { id: id, ...patient };

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

        const lastBreathRate =
          patient.breathRate[patient.breathRate.length - 1].value;

        const lastHeartRate =
          patient.heartRate[patient.heartRate.length - 1].value;

        const lasto2Level = patient.o2Level[patient.o2Level.length - 1].value;

        const lastDiastolicBP =
          patient.diastolicBP[patient.diastolicBP.length - 1].value;

        const lastSystolicBP =
          patient.systolicBP[patient.systolicBP.length - 1].value;

        // check abnormal breath rate
        // above 25 or below 12
        if (lastBreathRate < 12 || lastBreathRate > 25) {
          triggerAbnormalVitalNotifcation(
            patient,
            lastBreathRate,
            "breath rate"
          );
        }

        // check abnormal heart rate
        // above 130 or below 60

        if (lastHeartRate < 60 || lastHeartRate > 130) {
          triggerAbnormalVitalNotifcation(patient, lastHeartRate, "heart rate");
        }

        // check o2Level
        // below 90%

        if (lasto2Level < 90) {
          triggerAbnormalVitalNotifcation(patient, lasto2Level, "oxygen level");
        }

        // check systolicBP
        // above 120 mmHg or below 90 mmHg

        if (lastSystolicBP < 90 || lastSystolicBP > 120) {
          triggerAbnormalVitalNotifcation(
            patient,
            lastSystolicBP,
            "systolic blood pressure"
          );
        }

        // check diastolicBP
        // above 80 mmHg or below 60 mmHg

        if (lastDiastolicBP < 60 || lastDiastolicBP > 80) {
          triggerAbnormalVitalNotifcation(
            patient,
            lastDiastolicBP,
            "diastolic blood pressure"
          );
        }
      }
      // redirect to rooms page
      if (change.type === "removed") {
        // TODO: redirect to home screen if we're already inside the patient
        // later...
      }
    });
  });
}

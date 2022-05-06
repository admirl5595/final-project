import React, { useState, useContext } from "react";

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
} from "firebase/firestore";

import * as Notifications from "expo-notifications";
import PatientContext from "./config/PatientContext";

import ScreenSwitcher from "./src/screens/ScreenSwitcher";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faM,
  faW,
  faS,
  faT,
  faF,
  faCircle,
  faClock,
  faCalendar,
  faPlusCircle,
  faPersonRunning,
  faPersonSwimming,
  faFishFins,
  faTrash,
  faCircleExclamation,
  faFaceGrinTears,
  faCircleCheck,
  faFutbol,
  faSkiing,
  faDumbbell,
  faKeyboard,
  faCaretUp,
  faCaretDown,
  faCaretRight,
  faCaretLeft,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faM,
  faW,
  faS,
  faT,
  faF,
  faCircle,
  faClock,
  faCalendar,
  faPlusCircle,
  faPersonRunning,
  faPersonSwimming,
  faFishFins,
  faTrash,
  faCircleExclamation,
  faFaceGrinTears,
  faCircleCheck,
  faFutbol,
  faSkiing,
  faDumbbell,
  faKeyboard,
  faCaretUp,
  faCaretDown,
  faCaretRight,
  faCaretLeft,
  faGear
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [patients, setPatients] = useState([]);

  const q = query(
    collection(db, "patients"),
    where(documentId(), "==", patientId)
  );

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      console.log("Patient:");

      snapshot.docChanges().forEach((change) => {
        let patient = change.doc.data();
        console.log(patient);
        // add patient to state
        if (change.type === "added") {
          // TODO: add to global context
          // filter by 50 latest vitals into stack

          console.log("new patient: ", change.doc.data());
        }
        // update vitals
        if (change.type === "modified") {
          // TODO: pop and push new vital to context
          // check for abnormalities and trigger notification

          console.log("Modified city: ", change.doc.data());
        }
        // redirect to rooms page
        if (change.type === "removed") {
          // TODO: redirect to home screen if we're already inside the patient

          navigation.navigate("HomeScreen");
        }
      });
    });
  }, []);

  // conditional rendering of screens
  return (
    <PatientContext.Provider value={{ patients, setPatients }}>
      <ScreenSwitcher />
    </PatientContext.Provider>
  );
};

export default App;

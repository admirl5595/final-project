import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";

import { db } from "../../firebase-config";

import RoomInfo from "../components/room/room-info/RoomInfo";
import PatientVitals from "../components/room/patient-vitals/PatientVitals";

export default function Room({ patientId, navigation }) {
  // do a query towards patient

  // get all patients from global context
  //const [patients] = useContext(patientsContext);

  // get this specific patient from context
  // let patient = patients.filter(() => id === patientId);

  return (
    <View>
      <RoomInfo roomNr="ABC123" name="John Doe" date={Date.now()} />
      <PatientVitals breathRate={[(Date.now(), 50), (Date.now(), 50)]} />
    </View>
  );
}

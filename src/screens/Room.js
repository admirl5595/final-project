import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";

import { db } from "../../firebase-config";

import RoomInfo from "../components/room/room-info/RoomInfo";
import PatientVitals from "../components/room/patient-vitals/PatientVitals";
import PatientContext from "../../config/PatientContext";

export default function Room({ patientId, navigation }) {
  // do a query towards patient

  patientId = "19436161845";

  // get all patients from global context
  const { patients, setPatients } = useContext(PatientContext);

  // get this specific patient from context
  let patient = patients.filter((patient) => patient.id === patientId);

  console.log(patient);

  return (
    <View>
      <RoomInfo roomNr="ABC123" name="John Doe" date={Date.now()} />
      <PatientVitals breathRate={[(Date.now(), 50), (Date.now(), 50)]} />
    </View>
  );
}

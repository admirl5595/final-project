import React, { useEffect, useContext } from "react";
import { ScrollView, Text, Button } from "react-native";

import PrimaryButton from "../res/common/PrimaryButton";
import RoomInfo from "../components/room/room-info/RoomInfo";
import PatientVitals from "../components/room/patient-vitals/PatientVitals";
import PatientContext from "../../config/PatientContext";

import { theme } from "../res/theme";

export default function Room({ patientId, navigation }) {
  // do a query towards patient

  patientId = "19436161845";

  // get all patients from global context
  const { patients, setPatients } = useContext(PatientContext);

  // get this specific patient from context
  let patient = patients.filter((patient) => patient.id === patientId)[0];

  // console.log(patient.id);

  const handlePress = () => {
    console.log("hello");
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <RoomInfo roomNr="ABC123" name="John Doe" date={new Date()} />
      <PatientVitals
        breathRate={50}
        diastolicBP={50}
        heartRate={50}
        o2Level={50}
        systolicBP={50}
      />
      <PrimaryButton onPress={handlePress} title="View Observations" />
      <PrimaryButton title="Insert Observation" />
    </ScrollView>
  );
}

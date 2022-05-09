import React, { useEffect, useContext } from "react";
import { ScrollView, Text, Button, View } from "react-native";

import LoadingScreen from "./LoadingScreen";

import PrimaryButton from "../components/common/PrimaryButton";
import RoomInfo from "../components/room/room-info/RoomInfo";
import PatientVitals from "../components/room/patient-vitals/PatientVitals";
import PatientContext from "../../config/PatientContext";
import { useRoute } from "@react-navigation/native";
import { theme } from "../res/theme";

export default function Room({ patientId }) {
  // do a query towards patient

  const route = useRoute();
  const room = route.params.room;

  patientId = room.patientId;

  // get all patients from global context
  const { patients } = useContext(PatientContext);

  // get this specific patient from context
  let patient = patients.filter((patient) => patient.id === patientId)[0];

  // show loading screen if patient hasn't been fetched yet
  if (!patient) {
    return <LoadingScreen />;
  }

  console.log(patient.breathRate[patient.breathRate.length - 1].value);

  const breathRatePreview =
    patient.breathRate[patient.breathRate.length - 1].value;
  const diastolicBPPreview =
    patient.diastolicBP[patient.diastolicBP.length - 1].value;
  const heartRatePreview =
    patient.heartRate[patient.heartRate.length - 1].value;
  const o2LevelPreview = patient.o2Level[patient.o2Level.length - 1].value;
  const systolicBPPreview =
    patient.systolicBP[patient.systolicBP.length - 1].value;

  console.log("value in room: " + systolicBPPreview);

  const handlePress = () => {
    console.log("hello");
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <RoomInfo roomNr={room.roomNr} name={room.name} date={new Date()} />
      <PatientVitals
        breathRate={breathRatePreview}
        diastolicBP={diastolicBPPreview}
        heartRate={heartRatePreview}
        o2Level={o2LevelPreview}
        systolicBP={systolicBPPreview}
        patientId={patientId}
      />
      <PrimaryButton onPress={handlePress} title="View Observations" />
      <PrimaryButton title="Insert Observation" />
    </ScrollView>
  );
}

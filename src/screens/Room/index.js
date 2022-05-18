import React, { useEffect, useContext } from "react";
import { ScrollView, Text, Button, View } from "react-native";

import LoadingScreen from "../Loading/index";
import PrimaryButton from "../../components/common/PrimaryButton";
import RoomInfo from "./components/room-info/RoomInfo";
import PatientVitals from "./components/patient-vitals/PatientVitals";
import PatientContext from "../../services/PatientContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { theme } from "src/res/theme";
export default function Room({ patientId }) {
  // do a query towards patient

  const navigation = useNavigation();

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

  let breathRatePreview;
  let diastolicBPPreview;
  let heartRatePreview;
  let o2LevelPreview;
  let systolicBPPreview;

  if (
    patient.breathRate.length !== 0 &&
    patient.diastolicBP.length !== 0 &&
    patient.heartRate.length !== 0 &&
    patient.o2Level.length !== 0 &&
    patient.systolicBP.length !== 0
  ) {
    breathRatePreview = patient.breathRate[patient.breathRate.length - 1].value;
    diastolicBPPreview =
      patient.diastolicBP[patient.diastolicBP.length - 1].value;
    heartRatePreview = patient.heartRate[patient.heartRate.length - 1].value;
    o2LevelPreview = patient.o2Level[patient.o2Level.length - 1].value;
    systolicBPPreview = patient.systolicBP[patient.systolicBP.length - 1].value;
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    ></ScrollView>
  );
}

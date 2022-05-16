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
    patient.breathRate &&
    patient.diastolicBP &&
    patient.heartRate &&
    patient.o2Level &&
    patient.systolicBP
  ) {
    breathRatePreview = patient.breathRate[patient.breathRate.length - 1].value;
    diastolicBPPreview =
      patient.diastolicBP[patient.diastolicBP.length - 1].value;
    heartRatePreview = patient.heartRate[patient.heartRate.length - 1].value;
    o2LevelPreview = patient.o2Level[patient.o2Level.length - 1].value;
    systolicBPPreview = patient.systolicBP[patient.systolicBP.length - 1];
  }

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
      <PrimaryButton
        onPress={() =>
          navigation.navigate("ViewObservations", { patient: patient })
        }
        title="View Observations"
      />
      <PrimaryButton
        onPress={() =>
          navigation.navigate("InsertObservation", { patient: patient })
        }
        title="Insert Observation"
      />
    </ScrollView>
  );
}

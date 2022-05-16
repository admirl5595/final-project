import React, { useState, useContext } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import AssignPatient from "./component";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import PatientItem from "../Patients/component";
import PatientContext from "src/services/PatientContext";

import PrimaryButton from "src/components/common/PrimaryButton";

import { useRoute } from "@react-navigation/native";
import Header from "src/components/common/Header";

// TODO:
// can replace patient (can be empty)
// set previous patient as not admitted and new as admitted
// can only use unadmitted patients

export default function EditRoom() {
  const route = useRoute();
  const room = route.params.room;

  const roomNr = room.roomNr;
  const [sensorId, setSensorId] = useState(room.sensorId);
  const [ssn, setSsn] = useState(room.patientId);
  const [patient, setPatient] = useState(null);

  console.log(room);

  const navigation = useNavigation();

  // get all patients from global context
  const { patients } = useContext(PatientContext);

  // get this specific patient from context
  let prevPatient = patients.filter(
    (patient) => patient.id === room.patientId
  )[0];

  const editRoom = async () => {
    // TODO:

    if (!sensorId) {
      Alert.alert("enter sensor id");
      return;
    }

    if (!patient) {
      Alert.alert("Assign a patient to this room");
      return;
    }

    // updated fields
    const updatedRoom = {
      name: patient.name,
      patientId: patient.ssn,
      sensorId: sensorId,
    };

    const roomsCollectionRef = doc(db, "rooms", room.id);

    await updateDoc(roomsCollectionRef, updatedRoom);

    // set patient as admitted to room
    const patientDocRef = doc(db, "patients", patient.ssn);

    const updatedFields = {
      admitted: true,
    };
    await updateDoc(patientDocRef, updatedFields);

    navigation.navigate("Rooms");
  };

  return (
    <View style={styles.container}>
      <Header title={"Room: " + roomNr} />
      <TextInput
        value={sensorId}
        onChangeText={setSensorId}
        style={styles.textInput}
        placeholder="Sensor ID"
      />
      <Text>Previous patient</Text>
      <PatientItem patient={prevPatient} />

      <AssignPatient
        setPatient={setPatient}
        prevPatient={prevPatient}
        ssn={ssn}
        setSsn={setSsn}
      />
      <PrimaryButton onPress={editRoom} title="Add room and assign patient" />
    </View>
  );
}

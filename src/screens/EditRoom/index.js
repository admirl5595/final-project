import React, { useState, useContext } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import styles from "./style";
import AssignPatient from "./component";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import PatientItem from "../Patients/component";
import PatientContext from "src/services/PatientContext";
import RoomContext from "src/services/RoomContext";

import PrimaryButton from "src/components/common/PrimaryButton";
import { getRooms } from "../../services/crud-operations";

import { useRoute } from "@react-navigation/native";
import Header from "src/components/common/Header";

// TODO:
// can remove patient

export default function EditRoom() {
  const route = useRoute();
  const room = route.params.room;

  const roomNr = room.roomNr;
  const [ssn, setSsn] = useState(room.patientId);
  const [patient, setPatient] = useState(null);

  const navigation = useNavigation();

  // get all patients from global context
  const { patients } = useContext(PatientContext);
  const { setRooms } = useContext(RoomContext);

  // get this specific patient from context
  let PrevPatient = patients.filter(
    (patient) => patient.id === room.patientId
  )[0];

  const [prevPatient, setPrevPatient] = useState(PrevPatient);

  const editRoom = async () => {
    if (!patient) {
      Alert.alert("Assign new or delete previous patient");
      return;
    }

    // updated fields
    const updatedRoom = {
      name: patient.name,
      patientId: patient.ssn,
    };

    const roomsCollectionRef = doc(db, "rooms", room.id);

    await updateDoc(roomsCollectionRef, updatedRoom);

    // set patient as admitted to room
    const patientDocRef = doc(db, "patients", patient.ssn);

    let updatedFields = {
      admitted: true,
    };
    await updateDoc(patientDocRef, updatedFields);

    if (prevPatient) {
      // set previous patient as unadmitted (if new patient is null or was replaced)
      updatedFields = { admitted: false };

      const prevPatientDocRef = doc(db, "patients", prevPatient.id);

      await updateDoc(prevPatientDocRef, updatedFields);
    }

    // update room context
    getRooms(setRooms);

    navigation.navigate("ManageRooms");
  };

  const removePatient = async () => {
    // updated fields
    const updatedRoom = {
      name: "",
      patientId: "",
    };

    // TODO: Drag out to crud-operations
    const roomsCollectionRef = doc(db, "rooms", room.id);

    await updateDoc(roomsCollectionRef, updatedRoom);

    // set patient as admitted to room
    const patientDocRef = doc(db, "patients", prevPatient.id);

    let updatedFields = {
      admitted: false,
    };
    await updateDoc(patientDocRef, updatedFields);

    setPrevPatient(null);

    getRooms(setRooms);

    console.log("removed");
  };

  return (
    <View style={styles.container}>
      <Header title={"Room: " + roomNr} />

      {prevPatient ? (
        <>
          <PatientItem patient={prevPatient} />

          <PrimaryButton onPress={removePatient} title="Remove patient" />
        </>
      ) : null}

      <AssignPatient
        setPatient={setPatient}
        prevPatient={prevPatient}
        ssn={ssn}
        setSsn={setSsn}
      />
      <PrimaryButton onPress={editRoom} title="Assign patient" />
    </View>
  );
}

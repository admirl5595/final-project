import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import AssignPatient from "./component";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "src/components/common/PrimaryButton";

import { useRoute } from "@react-navigation/native";
import Header from "src/components/common/Header";

// TODO:
// can replace patient (can be empty)
// set previous patient as not admitted
// User room number as header (permanent attribute)
// change name

export default function EditRoom() {
  const route = useRoute();
  const room = route.params.room;

  const [roomNr, setRoomNr] = useState(room.roomNr);
  const [sensorId, setSensorId] = useState(room.sensorId);
  const [ssn, setSsn] = useState(room.patientId);
  const [patient, setPatient] = useState(null);

  const navigation = useNavigation();

  const addRoom = async () => {
    if (!roomNr) {
      Alert.alert("Enter a room number");
      return;
    }

    // TODO:
    // check if room already exists

    if (!sensorId) {
      Alert.alert("enter sensor id");
      return;
    }

    if (!patient) {
      Alert.alert("Assign a patient to this room");
      return;
    }

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
      <AssignPatient setPatient={setPatient} ssn={ssn} setSsn={setSsn} />
      <PrimaryButton onPress={addRoom} title="Add room and assign patient" />
    </View>
  );
}

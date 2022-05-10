import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import AssignPatient from "./component";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "src/components/common/PrimaryButton";

export default function AddRoom() {
  const [roomNr, setRoomNr] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [ssn, setSsn] = useState("");
  const [patient, setPatient] = useState(null);

  const navigation = useNavigation();

  const addRoom = async () => {
    if (!roomNr) {
      Alert.alert("Enter a room number");
      return;
    }

    if (!sensorId) {
      Alert.alert("enter sensor id");
      return;
    }

    if (!patient) {
      Alert.alert("Assign a patient to this room");
      return;
    }

    const newRoom = {
      name: patient.name,
      patientId: patient.ssn,
      roomNr: roomNr,
      sensorId: sensorId,
    };

    const roomsCollectionRef = collection(db, "rooms");

    await addDoc(roomsCollectionRef, newRoom);

    // set patient as admitted to room
    const patientDocRef = doc(db, "patients", patient.id);

    const updatedFields = {
      admitted: true,
    };
    await updateDoc(patientDocRef, updatedFields);

    navigation.navigate("Rooms");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={roomNr}
        onChangeText={setRoomNr}
        style={styles.textInput}
        placeholder="Room Number"
        maxLength={10}
      />
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

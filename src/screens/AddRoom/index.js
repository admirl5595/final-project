import React, { useState, useContext } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import AssignPatient from "./component";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { getRooms } from "../../services/crud-operations";
import RoomContext from "src/services/RoomContext";

import PrimaryButton from "src/components/common/PrimaryButton";

export default function AddRoom() {
  const [roomNr, setRoomNr] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [ssn, setSsn] = useState("");
  const [patient, setPatient] = useState(null);

  const { setRooms } = useContext(RoomContext);

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

    const newRoom = {
      name: patient.name,
      patientId: patient.ssn,
      roomNr: roomNr,
      sensorId: sensorId,
    };

    const roomsCollectionRef = collection(db, "rooms");

    await addDoc(roomsCollectionRef, newRoom);

    console.log(patient.ssn);

    // set patient as admitted to room
    const patientDocRef = doc(db, "patients", patient.ssn);

    const updatedFields = {
      admitted: true,
    };
    await updateDoc(patientDocRef, updatedFields);

    getRooms(setRooms);

    navigation.navigate("ManageRooms");
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

import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import PatientItem from "../Patients/component";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default function AssignPatient({ ssn, setSsn, setPatient }) {
  const [patientPreview, setPatientPreview] = useState(null);

  const findPatient = async () => {
    if (!ssn) {
      Alert.alert("enter a social security number");
      return;
    }

    const patientDocRef = doc(db, "patients", ssn);

    const patient = await getDoc(patientDocRef);

    console.log(patient.data().admitted);

    // check if patient doesn't exist
    if (!patient.exists()) {
      Alert.alert("patient doesn't exist");
      return;
    }

    // check if patient already has a room
    if (patient.admitted) {
      Alert.alert("patient is already admitted to a room");
      return;
    }

    setPatientPreview({ ...patient.data(), id: patient.id });
    setPatient({ ...patient.data(), id: patient.id });
  };

  console.log(ssn);

  return (
    <View>
      {patientPreview ? <PatientItem patient={patientPreview} /> : null}
      <TextInput
        value={ssn}
        onChangeText={setSsn}
        placeholder="enter ssn"
        style={styles.textInput}
        maxLength={9}
      />
      <PrimaryButton onPress={findPatient} title="Find patient" />
    </View>
  );
}

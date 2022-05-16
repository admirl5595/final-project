import React, { useState, useEffect } from "react";
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

    let patient = await getDoc(patientDocRef);

    // check if patient doesn't exist
    if (!patient.exists()) {
      Alert.alert("patient doesn't exist");
      return;
    }

    let patientId = patient.id;
    patient = patient.data();

    // check if patient already has a room
    if (patient.admitted === false) {
      Alert.alert("patient is already admitted to a room");
      return;
    }

    setPatientPreview({ ...patient, id: patientId });
    setPatient({ ...patient, id: patient.id });
  };

  useEffect(() => {
    findPatient();
  }, []);

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
      <PrimaryButton onPress={findPatient} title="Replace patient" />
    </View>
  );
}
import React, { useState, useEffect } from "react";
import { View, TextInput, Alert } from "react-native";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";

import SecondaryButton from "src/components/common/SecondaryButton";

import TextInputStyled from "src/components/common/TextInputStyled";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default function AssignPatient({
  ssn,
  setSsn,
  setPatient,
  prevPatient,
}) {
  const [patientPreview, setPatientPreview] = useState(null);

  const findPatient = async () => {
    // check if ssn equals current patient ssn

    if (prevPatient) {
      if (ssn === prevPatient.id) {
        Alert.alert("Patient is already assigned to this room");
        setPatient(null);
        setPatientPreview(null);
        return;
      }
    }

    if (!ssn) {
      Alert.alert("enter a social security number");
      return;
    }

    const patientDocRef = doc(db, "patients", ssn);

    let patient = await getDoc(patientDocRef);

    // check if patient doesn't exist
    if (!patient.exists()) {
      Alert.alert("patient doesn't exist");
      setPatient(null);
      setPatientPreview(null);
      return;
    }

    let patientId = patient.id;
    patient = patient.data();

    // check if patient already has a room
    if (patient.admitted === true) {
      Alert.alert("patient is already admitted to a room");
      return;
    }

    setPatientPreview({ ...patient, ssn: patientId });
    setPatient({ ...patient, ssn: patientId });
  };

  return (
    <View>
      {patientPreview ? (
        <SecondaryButton
          leftText={"name: " + patientPreview.name}
          rightText={"gender: " + patientPreview.gender}
        />
      ) : null}
      <TextInputStyled
        value={ssn}
        onChangeText={setSsn}
        placeholder="enter ssn"
        style={styles.textInput}
        maxLength={11}
      />
      <PrimaryButton onPress={findPatient} title={"Search"} />
    </View>
  );
}

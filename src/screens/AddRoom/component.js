import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";

import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";

import SecondaryButton from "src/components/common/SecondaryButton";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import TextInputStyled from "../../components/common/TextInputStyled";

export default function AssignPatient({ ssn, setSsn, setPatient }) {
  const [patientPreview, setPatientPreview] = useState(null);

  const findPatient = async () => {
    if (!ssn) {
      Alert.alert("enter a social security number");
      return;
    }

    const patientDocRef = doc(db, "patients", ssn);

    let patient = await getDoc(patientDocRef);

    console.log(patient.data());

    // check if patient doesn't exist
    if (!patient.exists()) {
      Alert.alert("patient doesn't exist");
      return;
    }

    let patientId = patient.id;
    patient = patient.data();

    // check if patient already has a room
    if (patient.admitted === true) {
      Alert.alert("patient is already admitted to a room");
      return;
    }

    setPatientPreview({ ...patient, id: patientId });
    setPatient({ ...patient, id: patient.id });
  };

  console.log(ssn);

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
        maxLength={9}
      />
      <PrimaryButton onPress={findPatient} title="Find patient" />
    </View>
  );
}

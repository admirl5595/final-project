import React, { useState } from "react";
import { View, Alert } from "react-native";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { async } from "@firebase/util";

import SecondaryButton from "src/components/common/SecondaryButton";

import TextInputStyled from "../../components/common/TextInputStyled";

// TODO:
// add search bar and return patient that matches ssn

export default function Patients({ navigation }) {
  const [patient, setPatient] = useState(null);
  const [ssn, setSsn] = useState("");

  const findPatient = async () => {
    const patientDocRef = doc(db, "patients", ssn);

    const patient = await getDoc(patientDocRef);

    // check if patient doesn't exist
    if (!patient.exists()) {
      Alert.alert("patient doesn't exist");
      return;
    }

    setPatient(patient.data());
  };

  return (
    <View style={styles.container}>
      {patient ? (
        <SecondaryButton
          leftText={"Name: " + patient.name}
          rightText={"Gender: " + patient.gender}
          onPress={() =>
            navigation.navigate("EditPatient", { patient: patient })
          }
        />
      ) : null}

      <TextInputStyled
        value={ssn}
        onChangeText={setSsn}
        placeholder="Social security number"
        style={styles.textInput}
      />
      <PrimaryButton onPress={findPatient} title="Find patient" />
      <PrimaryButton
        title="Register patient"
        onPress={() => navigation.navigate("AddPatient")}
      />
    </View>
  );
}

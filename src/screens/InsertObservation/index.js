import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { postObservation } from "../../services/crud-operations";
import { auth } from "../../../firebase-config";
import PrimaryButton from "../../components/common/PrimaryButton";
import HeaderAndIcon from "../../components/common/HeaderAndIcon";

import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "./styles";

// TODO: Denne skal brukes når contexten er laget
// let { patients, setPatients } = useContext(PatientContext);

export default function InsertObservationScreen() {
  const user = auth.currentUser;

  const route = useRoute();
  const patient = route.params.patient;

  const navigation = useNavigation();

  const [newobservationdesc, setNewObservationDesc] = useState("");

  const newobservationInfo = {
    author: user.displayName,
    description: newobservationdesc,
    time: Date.now(),
  };

  const handleSubmit = async () => {
    await postObservation(newobservationInfo, patient.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
            <HeaderAndIcon
        title={"Insert observation for " + patient.name}
        icon="user-doctor"
      />
      <TextInput
        value={newobservationdesc}
        onChangeText={setNewObservationDesc}
        placeholder="Description"
        style={styles.input}
        multiline={true}
        numberOfLines={5}
      />
      <PrimaryButton title="Submit" onPress={handleSubmit} />
    </View>
  );
}

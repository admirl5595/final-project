import {
  View,
  Text,
  ScrollView,
  Button,
  DataTable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../config/PatientContext";
import { postObservation } from "../services/crud-operations";
import { auth } from "../../firebase-config";

import { useRoute } from "@react-navigation/native";

// TODO: Denne skal brukes når contexten er laget
// let { patients, setPatients } = useContext(PatientContext);

export default function InsertObservationScreen() {
  const user = auth.currentUser;

  const route = useRoute();
  const patient = route.params.patient;

  const [newobservationdesc, setNewObservationDesc] = useState("");

  const newobservationInfo = {
    author: user.displayName,
    description: newobservationdesc,
    time: Date.now(),
  };

  const handleSubmit = () => {
    postObservation(newobservationInfo, patient.id);
  };

  return (
    <>
      <View>
        <TextInput
          value={newobservationdesc}
          onChangeText={setNewObservationDesc}
          placeholder="Description"
        />
        <Button title="submit" onPress={handleSubmit}></Button>
      </View>
    </>
  );
}

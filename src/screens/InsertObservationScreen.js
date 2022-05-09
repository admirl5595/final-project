import {
  View,
  Text,
  ScrollView,
  Button,
  DataTable,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../config/PatientContext";
import { postObservation } from "../services/crud-operations";
import { auth } from "../../firebase-config";
import PrimaryButton from "../components/common/PrimaryButton";

import { theme } from "../res/theme";
import { useRoute, useNavigation } from "@react-navigation/native";

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
      <Text style={styles.textHeader}>
        Insert observation for {patient.name}
      </Text>
      <TextInput
        value={newobservationdesc}
        onChangeText={setNewObservationDesc}
        placeholder="Description"
        style={styles.input}
        multiline={true}
        numberOfLines={5}
      />
      <PrimaryButton title="submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: theme.spacing.m,
    paddingTop: "30%",
  },
  input: {
    backgroundColor: theme.colors.secondary_fontColor,
    padding: theme.spacing.s,
    marginBottom: theme.spacing.l,
  },
  textHeader: {
    ...theme.textVariants.header,
    textAlign: "center",
    marginVertical: theme.spacing.xl,
  },
});

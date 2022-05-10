import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../../config/PatientContext";
import Chart from "./component";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";

export default function Monitor() {
  const { patients } = useContext(PatientContext);
  let aPatient = { breathRate: null };

  const route = useRoute();
  const vitalType = route.params.vitalType;
  const patientId = route.params.patientId;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monitor</Text>
      <Chart patientId={patientId} vitalType={vitalType} />
    </View>
  );
}

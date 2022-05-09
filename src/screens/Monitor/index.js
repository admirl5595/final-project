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

  // contains the attributes we want to show in graph (eg: ["systolicBP", "diastolicBP"])
  // fetch and pass to chart
  const vitalTypes = route.params.vitalTypes;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monitor</Text>
      <Chart patientId={"000011111"} vitalsAry={aPatient.breathRate} />
    </View>
  );
}

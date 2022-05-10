import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "src/services/PatientContext";
import Chart from "./component";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Monitor() {
  const { patients } = useContext(PatientContext);
  let aPatient = { breathRate: null };

  const route = useRoute();
  const vitalType = route.params.vitalType;
  const patientId = route.params.patientId;
  const icon = route.params.icon;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monitor</Text>
      <FontAwesomeIcon
        size={80}
        icon={icon}
        color={"red"}
        style={styles.icon}
      />

      <Chart patientId={patientId} vitalType={vitalType} />
    </View>
  );
}

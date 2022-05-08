import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../../config/PatientContext";
import Chart from "./component";
import styles from "./styles";

export default function Monitor() {
  const { patients } = useContext(PatientContext);
  let aPatient = { breathRate: null };


    return (
      <View style={styles.container}>
        <Text style={styles.header}>Monitor</Text>
        <Chart patientId={"000011111"} vitalsAry={aPatient.breathRate} />
      </View>
    );
}

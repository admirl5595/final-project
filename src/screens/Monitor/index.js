import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Chart from "./component";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useOrientation } from "src/hooks/useOrientation";

export default function Monitor() {
  const orientation = useOrientation();

  const route = useRoute();
  const vitalType = route.params.vitalType;
  const patientId = route.params.patientId;
  const icon = route.params.icon;

  if (orientation == "PORTRAIT") {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Monitor</Text>
        <FontAwesomeIcon
          size={80}
          icon={icon}
          color={"red"}
          style={styles.icon}
        />

        <Chart patientId={patientId} vType={vitalType} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.headerRotated}>Monitor</Text>
        <Chart
          patientId={patientId}
          vType={vitalType}
        />
      </View>
    );
  }
}

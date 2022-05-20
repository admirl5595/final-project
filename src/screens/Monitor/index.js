import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Chart from "./component";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { useOrientation } from "src/hooks/useOrientation";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";

export default function Monitor() {
  const orientation = useOrientation();
  const route = useRoute();
  const vitalType = route.params.vitalType;
  const patientId = route.params.patientId;
  const icon = route.params.icon;

  if (orientation === "PORTRAIT") {
    return (
      <View style={styles.container}>
        <HeaderAndIcon title="Monitor" icon={icon} iconColor="#AE0000" />
        <Chart patientId={patientId} vType={vitalType} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Chart patientId={patientId} vType={vitalType} />
      </View>
    );
  }
}

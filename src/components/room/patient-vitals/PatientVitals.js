import React from "react";
import { View, Text } from "react-native";

import VitalItem from "./VitalItem";

export default function PatientVitals({
  breathRate,
  diastolicBP,
  heartRate,
  o2Level,
  systolicBP,
  patientId,
}) {
  return (
    <View>
      <VitalItem
        title="HR"
        value={breathRate}
        icon="lungs"
        patientId={patientId}
      />
      <VitalItem
        title="BPM"
        value={diastolicBP}
        icon="heart-pulse"
        patientId={patientId}
      />
      <VitalItem
        title="diaBP"
        value={heartRate}
        icon="heart-pulse"
        patientId={patientId}
      />
      <VitalItem
        title="O2"
        value={o2Level}
        icon="lungs"
        patientId={patientId}
      />
      <VitalItem
        title="sysBP"
        value={systolicBP}
        icon="mask-ventilator"
        patientId={patientId}
      />
    </View>
  );
}

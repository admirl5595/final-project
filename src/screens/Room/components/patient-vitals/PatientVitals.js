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
        title="BPM"
        value={breathRate}
        icon="lungs"
        patientId={patientId}
        vitalTypes={["breathRate"]}
      />
      <VitalItem
        title="HR"
        value={heartRate}
        icon="heart-pulse"
        patientId={patientId}
        vitalTypes={["heartRate"]}
      />
      <VitalItem
        title="spO2"
        value={o2Level}
        icon="lungs"
        patientId={patientId}
        vitalTypes={["o2Level"]}
      />
      <VitalItem
        title="BP"
        value={systolicBP + "/" + diastolicBP}
        icon="heart-pulse"
        patientId={patientId}
        vitalTypes={["systolicBP", "diastolicBP"]}
      />
    </View>
  );
}

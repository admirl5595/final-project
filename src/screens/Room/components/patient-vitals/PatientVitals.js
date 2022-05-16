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
  console.log(systolicBP);
  console.log(diastolicBP);

  return (
    <View>
      <VitalItem
        title={"BPM"}
        value={breathRate ? breathRate : "N/A"}
        icon="lungs"
        patientId={patientId}
        vitalTypes={["breathRate"]}
      />
      <VitalItem
        title="HR"
        value={heartRate ? heartRate : "N/A"}
        icon="heart-pulse"
        patientId={patientId}
        vitalTypes={["heartRate"]}
      />
      <VitalItem
        title={"spO2"}
        value={o2Level ? o2Level : "N/A"}
        icon="lungs"
        patientId={patientId}
        vitalTypes={["o2Level"]}
      />
      <VitalItem
        title="BP"
        value={systolicBP ? systolicBP + "/" + diastolicBP : "N/A"}
        icon="heart-pulse"
        patientId={patientId}
        vitalTypes={["systolicBP", "diastolicBP"]}
      />
    </View>
  );
}

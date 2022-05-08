import React from "react";
import { View, Text } from "react-native";

import VitalItem from "./VitalItem";

export default function PatientVitals({
  breathRate,
  diastolicBP,
  heartRate,
  o2Level,
  systolicBP,
}) {
  return (
    <View>
      <VitalItem title="HR" value={breathRate} icon="lungs" />
      <VitalItem title="BPM" value={diastolicBP} icon="heart-pulse" />
      <VitalItem title="diaBP" value={heartRate} icon="heart-pulse" />
      <VitalItem title="O2" value={o2Level} icon="lungs" />
      <VitalItem title="sysBP" value={systolicBP} icon="mask-ventilator" />
    </View>
  );
}

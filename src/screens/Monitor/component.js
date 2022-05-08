import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../../config/PatientContext";
import styles from "./styles";

import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function Chart({ patientId, vitalsAry }) {
  const labels = {
    heartRate: "BPM",
  };

  const { patients } = useContext(PatientContext);

  const [vitalsList, setVitalsList] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [timeList, setTimeList] = useState(null);

  useEffect(async () => {
    getPatient();
  }, []);

  async function getPatient() {
    const querySnapshot = await getDoc(doc(db, "patients", "01019901111"));
    let aPatient = querySnapshot.data();

    vitalsAry = aPatient.breathRate.slice(-5);
    let vitalValues = vitalsAry.map((vital) => vital.value);
    let vitalTime = vitalsAry.map((vital) => vital.time);
    console.log("\n **************PATIENT************* \n");
    console.log(vitalValues);
    console.log(vitalTime);

    setVitalsList(vitalValues);
    setTimeList(vitalTime);
  }

  const data = {
    labels: vitalsList,
    datasets: [
      {
        data: vitalsList,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [labels.heartRate], // Type of vital
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grade Chart</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisSuffix="" /// QST? BPM
        chartConfig={chartConfig}
      />
    </View>
  );
}

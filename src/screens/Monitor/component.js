import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "../../../config/PatientContext";
import styles from "./styles";
import { theme } from "../../res/theme";

import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";
import { async } from "@firebase/util";

/* 
  TODO
- Gjøre det slik at den funker for hvert vitalia
- Endre på design av grafen
- Gjøre det slik at den kan roteres
*/

export default function Chart({ patientId, vitalType }) {
  const { patients } = useContext(PatientContext);

  const [vitalsList, setVitalsList] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [timeList, setTimeList] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    let patient = null;
    let vitalsAry = null;

    switch (vitalType) {
      case "HR":
        patient = patients.filter((p) => {
          p.id == patientId;
        });
        vitalsAry = patient.map((a) => a.heartRate).slice(-13);
        console.log("HR: ", vitalsAry);
        setStates(vitalsAry);
        break;

      case "BPM":
        patient = patients.filter((p) => {
          p.id == patientId;
        });
        vitalsAry = patient.map((a) => a.breathRate).slice(-13);
        console.log("BPM: ", vitalsAry);
        setStates(vitalsAry);
        break;

      case "spO2":
        patient = patients.filter((p) => {
          p.id == patientId;
        });
        vitalsAry = patient.map((a) => a.o2Level).slice(-13);
        console.log("BPM: ", vitalsAry);
        setStates(vitalsAry);
        break;

      // TODO Sjekke om man kan ha 2D-array
      case "BP":
        patient = patients.filter((p) => {
          p.id == patientId;
        });
        vitalsAry = patient.map((a) => a.breathRate).slice(-13);
        console.log("BPM: ", vitalsAry);
        setStates(vitalsAry);
        break;

      default:
        console.log("Switch went default");
        break;
    }
  }, [patients]);

  async function setStates(vitalsAry) {
    let vitalValues = vitalsAry.map((vital) => vital.value);
    let time = vitalsAry.map((t) =>
      new Date(t.time.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    for (let i = 0; i < time.length; i++) {
      if (i % 4 != 0) {
        time[i] = "";
      }
    }

    console.log("\n **************PATIENT************* \n");
    console.log(vitalValues);
    console.log(time);

    setVitalsList(vitalValues);
    setTimeList(time);
  }

  const data = {
    labels: timeList,
    datasets: [
      {
        data: vitalsList,
        strokeWidth: 2, // optional
      },
    ],
    legend: [vitalType], // Type of vital
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.secondary_fontColor,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: theme.colors.secondary_fontColor,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(150,150,150, ${opacity})`, // optional // TODO endre på fargen på denne. Gjøre den mer grå
    decimalPlaces: 0, // optional, defaults to 2dp
    strokeWidth: 4, // Tykkelsen på linesene
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisSuffix="" /// QST? BPM
        yAxisInterval="4"
        chartConfig={chartConfig}
        hidePointsAtIndex="[]"
      />
    </View>
  );
}

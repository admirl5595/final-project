import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PatientContext from "src/services/PatientContext";
import styles from "./styles";
import { theme } from "src//res/theme";
import FlashMessage, { showMessage } from "react-native-flash-message";

import { LineChart } from "react-native-chart-kit";

/* 
  TODO
- Gjøre det slik at den funker for hvert vitalia
- Endre på design av grafen
- Gjøre det slik at den kan roteres
*/

export default function Chart({ patientId, vitalType }) {
  const { patients } = useContext(PatientContext);

  const [vitalsList, setVitalsList] = useState([
    [2, 4],
    [1, 5],
  ]);
  const [timeList, setTimeList] = useState([0]);
  const dataPoints = 22; // QST? Burde denne ut i en egen fil?
  let patient = null;

  useEffect(() => {
    let patient = patients.filter((p) => p.id == patientId)[0];
    let vitalsAry = null;

    switch (vitalType) {
      case "HR":
        vitalsAry = patient.heartRate.slice(-dataPoints);
        setStates(vitalsAry);
        break;

      case "BPM":
        vitalsAry = patient.breathRate.slice(-dataPoints);
        setStates(vitalsAry);
        break;

      case "spO2":
        vitalsAry = patient.o2Level.slice(-dataPoints);
        setStates(vitalsAry);
        break;

      // TODO Sjekke om man kan ha 2D-array
      case "BP":
        let sys = patient.systolicBP.slice(-dataPoints);
        let dia = patient.diastolicBP.slice(-dataPoints);

        setStates([sys, dia]);
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
        fromZero="true"
        onDataPointClick={({ value, getColor }) =>
          showMessage({
            message: `${value + " " + vitalType}`,
            description: " ",
            backgroundColor: getColor(0.9),
          })
        }
      />
      <FlashMessage duration={1000} />
    </View>
  );
}

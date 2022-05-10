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

export default function Chart({ patientId, vType }) {
  const { patients } = useContext(PatientContext);

  const [dataset, setDataset] = useState([
    {
      data: [0],
      strokeWidth: 2, // optional
    },
  ]);
  const [timeList, setTimeList] = useState([0]);
  const [vitalType, setVitalType] = useState([vType]);

  const dataPoints = 22; // QST? Burde denne ut i en egen fil?

  useEffect(() => {
    let patient = patients.filter((p) => p.id == patientId)[0];
    let vitalsAry = null;

    switch (vType) {
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

      case "BP":
        setVitalType(["Systolic", "Diastolic"]);
        let sys = patient.systolicBP.slice(-dataPoints);
        let dia = patient.diastolicBP.slice(-dataPoints);

        let time = sys.map((t) =>
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

        sys = sys.map((vital) => vital.value);
        dia = dia.map((vital) => vital.value);

        let ds = [
          {
            data: sys,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
          },
          {
            data: dia,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
          },
        ];

        setDataset(ds);
        setTimeList(time);
        break;

      default:
        console.log("Switch went default");
        break;
    }
  }, [patients]);

  function setStates(vitalsAry) {
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

    let ds = [
      {
        data: vitalValues,
        strokeWidth: 2, // optional
      },
    ];

    setDataset(ds);
    setTimeList(time);
  }

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
        bezier
        data={{
          labels: timeList,
          datasets: dataset,
          legend: vitalType, // Type of vital
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisSuffix="" /// QST? BPM
        yAxisInterval="4"
        chartConfig={chartConfig}
        fromZero="true"
        onDataPointClick={({ value, getColor }) =>
          showMessage({
            message: `${value + " " + vType}`,
            description: " ",
            backgroundColor: getColor(0.9),
          })
        }
      />
      <FlashMessage duration={1000} />
    </View>
  );
}

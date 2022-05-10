import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text } from "react-native";
import styles from "./styles";
import Observation from "./component";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/native";
import { theme } from "src/res/theme";

export default function ViewObservations() {
  const route = useRoute();
  const patient = route.params.patient;
  const observations = [...patient.observations];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Observations: {patient.name}</Text>
      <FontAwesomeIcon
        icon="user-doctor"
        size={150}
        color={theme.colors.secondary_fontColor}
      />
      {observations.length != 0 ? (
        observations.map((o) => <Observation key={o.time} observation={o} />)
      ) : (
        <Text>No observations!</Text>
      )}
    </ScrollView>
  );
}
import React from "react";
import { Text, FlatList, View } from "react-native";
import styles from "./styles";
import Observation from "./component";

import { useRoute } from "@react-navigation/native";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";

export default function ViewObservations() {
  const route = useRoute();
  const patient = route.params.patient;

  const observations = [...patient.observations];

  return (
    <View style={styles.container}>
      <HeaderAndIcon
        icon="user-doctor"
        title={"Observations for: " + patient.name}
      />
      {observations.length !== 0 ? (
        <FlatList
          data={observations}
          renderItem={({ item }) => <Observation observation={item} />}
        />
      ) : (
        <Text>This patient has no observations</Text>
      )}
    </View>
  );
}

import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";

import PrimaryButton from "src/components/common/PrimaryButton";

export default function AddRoom() {
  return (
    <View style={styles.container}>
      <Text>Add room</Text>
      <TextInput style={styles.textInput} placeholder="Room Number" />
      <TextInput style={styles.textInput} placeholder="Sensor ID" />
      <PrimaryButton title="Assign patient to room" />
      <PrimaryButton title="Add room" />
    </View>
  );
}

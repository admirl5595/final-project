import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "src/res/theme";

// TODO:
// navigate to patient screen on press

export default function PatientItem({ patient }) {
  if (!patient) return null;

  return (
    <View style={styles.container}>
      <Text>name: {patient.name}</Text>
      <Text>gender: {patient.gender}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.s,
    backgroundColor: theme.colors.secondary_fontColor,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "src/res/theme";

export default function PatientItem({ patient }) {
  return (
    <View style={styles.container}>
      <Text>name: {patient.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.s,
    backgroundColor: theme.colors.secondary_fontColor,
    margin: theme.spacing.s,
  },
});

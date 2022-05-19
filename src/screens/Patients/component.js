import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "src/res/theme";
import { useNavigation } from "@react-navigation/native";


// TODO:
// navigate to patient screen on press

export default function PatientItem({ patient }) {
  if (!patient) return null;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditPatient", { patient: patient })}
    >
      <View style={styles.container}>
        <Text>name: {patient.name}</Text>
        <Text>gender: {patient.gender}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.secondary_fontColor,
    marginVertical: theme.spacing.m,
    margin: theme.spacing.s,
  },
});

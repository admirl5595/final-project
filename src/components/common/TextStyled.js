import { Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/res/theme";

// secureTextEntry: shows dots no characters
// onChangeText: use setState() in parent component
// value: state value in parent component
export default function TextStyled({ title }) {
  return <Text style={styles.container}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    ...theme.shadowVariants.shadowInput,
    margin: theme.spacing.s,
    padding: theme.spacing.s,
    backgroundColor: "#fff",
    fontSize: 20,
  },
});

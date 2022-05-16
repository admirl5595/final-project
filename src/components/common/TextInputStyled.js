import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { theme } from "src/res/theme";

// secureTextEntry: shows dots no characters
// onChangeText: use setState() in parent component
// value: state value in parent component
export default function TextInputStyled({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
}) {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.s,
    padding: theme.spacing.s,
    backgroundColor: "#fff",
  },
});

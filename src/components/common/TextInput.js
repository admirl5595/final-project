import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { theme } from "src/res/theme";

export default function TextInput() {
  return <TextInput style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.s,
    padding: theme.spacing.s,
  },
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/res/theme";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.s,
    padding: theme.spacing.s,
  },
  text: {
    ...theme.textVariants.bigHeader,
    textAlign: "center",
    color: theme.colors.secondary_fontColor,
  },
});

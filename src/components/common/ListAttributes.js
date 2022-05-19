import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/res/theme";

export default function ListAttributes({ leftText, rightText, testID }) {
  return (
    <View testID={testID} style={styles.container}>
      <Text style={styles.text}>{leftText}</Text>
      <Text style={styles.text}>{rightText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.s,
    padding: theme.spacing.s,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    ...theme.textVariants.header,
    color: theme.colors.secondary_fontColor,
  },
});

import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import React from "react";
import { theme } from "src/res/theme";

export default function LoadingOverlay({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  text: {
    ...theme.textVariants.header,
    textAlign: "center",
  },
});

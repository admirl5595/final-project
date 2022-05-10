import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

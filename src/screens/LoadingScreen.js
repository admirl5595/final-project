import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
  },
});

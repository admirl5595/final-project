import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/res/theme";
import TextInputStyled from "src/components/common/TextInputStyled";

export default function ComponentsTest() {
  return (
    <View style={styles.container}>
      <TextInputStyled />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});

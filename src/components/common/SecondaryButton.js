import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "src/res/theme";

// leftText: text displayed on the left side of button
// rightText: text displayed on the right side of button
// onPress: function triggered when pressing the button
export default function SecondaryButton({ onPress, leftText, rightText }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View style={styles.container}>
        <Text style={styles.leftText}>{leftText}</Text>
        <Text style={styles.rightText}>{rightText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftText: {
    textAlign: "left",
    ...theme.textVariants.header,
    color: theme.primary_fontColor,
  },
  rightText: {
    textAlign: "right",
    ...theme.textVariants.header,
    color: theme.primary_fontColor,
  },
  btn: {
    ...theme.boxSize.l,
    ...theme.boxType.filled,
    margin: theme.spacing.m,
  },
});

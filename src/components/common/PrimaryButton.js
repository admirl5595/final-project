import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "src/res/theme";

// title: text displayed inside button
// onPress: function triggered when pressing the button

export default function PrimaryButton({ onPress, title, testID }) {
  return (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...theme.shadowVariants.shadowBtn,
    backgroundColor: theme.colors.background,
    borderWidth: 4,
    alignContent: "center",
    justifyContent: "center",
    borderColor: theme.colors.secondary_fontColor,
    padding: theme.spacing.m,
    margin: theme.spacing.s,
  },

  text: {
    textAlign: "center",
    ...theme.textVariants.header,
    color: theme.colors.secondary_fontColor,
  },
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/res/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function HeaderAndIcon({ title, icon, iconColor }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <FontAwesomeIcon
        style={styles.icon}
        icon={icon}
        size={60}
        color={iconColor ? iconColor : "#fff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.s,
    padding: theme.spacing.s,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...theme.textVariants.bigHeader,
    textAlign: "center",
    color: theme.colors.secondary_fontColor,
  },
  icon: {
    margin: theme.spacing.s,
  },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "src/res/theme";

// leftText: text displayed on the left side of button
// rightText: text displayed on the right side of button
// onPress: function triggered when pressing the button
export default function RoomListItem({
  onPress,
  leftText,
  rightText,
  style,
  fontColor,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={styles.container}>
        <Text style={styles.leftText} fontColor={fontColor}>
          {leftText}
        </Text>
        <Text style={styles.rightText} fontColor={fontColor}>
          {rightText}
        </Text>
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
  },
  rightText: {
    textAlign: "right",
    ...theme.textVariants.header,
  },
});

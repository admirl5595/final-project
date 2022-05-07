import React from "react";
import { View, Text } from "react-native";

import styles from "./RoomInfoStyle";
import { theme } from "../../../res/theme";

export default function RoomInfo({ roomNr, name, date }) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const dateString = dd + "/" + mm + "/" + yyyy;

  const timeString =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    date.getMinutes();

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.textVariants.header,
          color: theme.colors.secondary_fontColor,
        }}
      >
        Room: {"\n"}
        {roomNr}
      </Text>
      <View style={styles.dateContainer}>
        <Text
          style={{
            ...theme.textVariants.body,
            color: theme.colors.secondary_fontColor,
          }}
        >
          Date: {dateString}
        </Text>
        <Text
          style={{
            ...theme.textVariants.body,
            color: theme.colors.secondary_fontColor,
          }}
        >
          Time: {timeString}
        </Text>
      </View>
    </View>
  );
}

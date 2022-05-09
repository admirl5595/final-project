import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../res/theme";

export default function Observation({ observation }) {
  let date = new Date(observation.time);

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const dateString = dd + "/" + mm + "/" + yyyy;

  const timeString =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

  return (
    <View style={styles.container} key={observation.date}>
      <Text style={styles.textHeader}>Author:</Text>
      <Text style={styles.textBody}>{observation.author}</Text>

      <Text style={styles.textHeader}>Date:</Text>
      <Text style={styles.textBody}>{dateString}</Text>

      <Text style={styles.textHeader}>Time:</Text>
      <Text style={styles.textBody}>{timeString}</Text>

      <Text style={styles.textHeader}>Description:</Text>
      <Text style={styles.textBody}>{observation.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    padding: theme.spacing.m,
    width: "80%",
    marginVertical: 10,
    borderColor: theme.colors.secondary_fontColor,
  },

  textHeader: {
    ...theme.textVariants.header,
    color: theme.colors.secondary_fontColor,
  },
  textBody: {
    ...theme.textVariants.body,
    marginBottom: theme.spacing.s,
  },
});

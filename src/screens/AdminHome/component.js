import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styles from "./styles";

// title: text displayed inside button
// onPress: function triggered when pressing the button

export default function Button({ onPress, title, icon }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.iconText}>
        <FontAwesomeIcon size={40} icon={icon} color={"black"} />
        <Text style={styles.btnText}> {title}</Text>
      </View>
    </TouchableOpacity>
  );
}

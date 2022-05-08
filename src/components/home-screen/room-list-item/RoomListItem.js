import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RoomListItemStyle";
// item:
// room {date, name, patientId, roomNr, sensorId}
export default function ListItem({ item }) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>Room {item.roomNr}</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RoomListItemStyle";

import { useNavigation } from "@react-navigation/native";

// item:
// room {date, name, patientId, roomNr, sensorId}
export default function ListItem({ item }) {
  // TODO: fix error: you might have mismatching versions of React and the renderer
  // const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>Room {item.roomNr}</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

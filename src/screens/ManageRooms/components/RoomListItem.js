import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RoomListItemStyle";
import { useNavigation } from "@react-navigation/native";

// item:
// room {date, name, patientId, roomNr }
export default function RoomListItem({ item }) {
  // reference to user document

  const navigation = useNavigation();

  // TODO: fix error: you might have mismatching versions of React and the renderer
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditRoom", { room: item })}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Room {item.roomNr}</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

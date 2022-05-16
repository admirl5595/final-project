import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RoomListItemStyle";
import { useNavigation } from "@react-navigation/native";

// item:
// room {date, name, patientId, roomNr, sensorId}
export default function RoomListItem({ item, goTo }) {
  // reference to user document

  const navigation = useNavigation();

  console.log(goTo);

  // TODO: fix error: you might have mismatching versions of React and the renderer
  return (
    <TouchableOpacity
      onLongPress={goTo ? () => navigation.navigate(goTo) : () => {}}
      onPress={() => navigation.navigate("Room", { room: item })}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Room {item.roomNr}</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

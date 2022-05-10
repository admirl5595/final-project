import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./VitalItemStyle";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function VitalItem({ title, value, icon, patientId }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconText}>
        <FontAwesomeIcon size={40} icon={icon} color={"red"} />
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.iconText}>
        <Text style={styles.text}>{value}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Monitor", {
              patientId: patientId,
              vitalType: title,
            })
          }
        >
          <FontAwesomeIcon size={40} icon="chart-line" color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles";
import Button from "./component";

// TODO:
// rename Home screen to Rooms (fix imports)
// add conditional rendering of Add room and edit room buttons (if role==admin)

export default function AdminHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>
      <Button
        icon="users"
        title="Employees"
        onPress={() => navigation.navigate("Employees")}
      />
      <Button
        icon="hospital"
        title="Rooms"
        onPress={() => navigation.navigate("Rooms")}
      />
      <Button
        icon="bed-pulse"
        title="Patients"
        onPress={() => navigation.navigate("Patients")}
      />
    </View>
  );
}

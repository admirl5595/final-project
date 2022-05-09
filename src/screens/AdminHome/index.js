import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles";
import Button from "./component";

export default function AdminHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>
      <Button icon="users" title="Employees" onPress={""} />
      <Button icon="hospital" title="Manage Rooms" onPress={""} />
      <Button icon="bed-pulse" title="Patient" onPress={""} />
      <Button icon="house" title="Home" onPress={""} />
    </View>
  );
}

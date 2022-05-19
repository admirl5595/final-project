import React from "react";
import { View, ScrollView, Text } from "react-native";
import LogoutBtn from "../../components/auth/LogoutBtn";
import { auth } from "../../../firebase-config";
import styles from "./styles";

export default function Settings() {
  // Show a settings interface for user
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userCard}>
          <Text style={styles.text}>
            Signed in as: {auth.currentUser.email}
          </Text>
        </View>
        <View style={styles.centeredView}>
          <LogoutBtn />
        </View>
      </ScrollView>
    </View>
  );
}

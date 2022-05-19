import React from "react";
import { View, ScrollView, Text } from "react-native";
import { auth } from "../../../firebase-config";
import { signOut } from "firebase/auth";
import styles from "./styles";
import PrimaryButton from "src/components/common/PrimaryButton";

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
          <PrimaryButton
            onPress={() =>
              signOut(auth)
                .then(() => {})
                .catch((error) => {
                  // An error happened
                  console.log(error);
                })
            }
            title="Log Out"
          />
        </View>
      </ScrollView>
    </View>
  );
}

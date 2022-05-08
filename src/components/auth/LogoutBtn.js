import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";

import { theme } from "../../res/theme";

export default function LogoutBtn() {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          signOut(auth)
            .then(() => {
              // Sign-out successful
              setHabits(null); // clear context
            })
            .catch((error) => {
              // An error happened
              console.log(error);
            })
        }
        style={styles.logoutBtn}
      >
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    marginBottom: 100,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

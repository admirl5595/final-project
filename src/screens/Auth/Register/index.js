import {
  Keyboard,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

import { db } from "../../../../firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import styles from "./styles";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Resize logo when keyboard is open to be able to read all entries
  const [imageSize, setImageSize] = useState({ width: 230, height: 230 });
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setImageSize({ width: 100, height: 100 });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setImageSize({ width: 230, height: 230 });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const handleRegister = async () => {
    console.log("registering");
    if (password !== passwordConfirm) {
      Alert.alert("Failed to confirm password");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // get user information
        const user = auth.currentUser;

        // store habits and user id in user collection
        const userData = {
          uid: user.uid,
          email: email,
        };

        // create new document in users collection with user id as name
        setDoc(doc(db, "users", user.uid), userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert(errorCode);
      });

    const user = auth.currentUser;

    await updateProfile(user, { displayName: name })
      .then(() => {
        // get user information
        const user = auth.currentUser;

        // store username
        const userName = {
          displayName: name,
        };

        // create new document in users collection with user id as name
        updateDoc(doc(db, "users", user.uid), userName);
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert(errorCode);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.InputView}></View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Full Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(passwordConfirm) =>
            setPasswordConfirm(passwordConfirm)
          }
        />
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.btn}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

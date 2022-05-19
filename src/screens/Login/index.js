import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import styles from "../Login/styles";
import PrimaryButton from "src/components/common/PrimaryButton";
import TextInputStyled from "src/components/common/TextInputStyled";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {})
      .catch((error) => {
        alert("Invalid email or password!");
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ marginVertical: 20 }}>
        <HeaderAndIcon title="Login" icon="hospital-user" />
      </View>

      <View style={styles.inputView}>
        <TextInputStyled
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInputStyled
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <Text style={styles.text}>Don't have a user? Contact an admin</Text>

      <View style={{ marginVertical: 20 }}>
        <PrimaryButton title="Login" testID="loginBtn" onPress={handleLogin} />
      </View>
    </View>
  );
}

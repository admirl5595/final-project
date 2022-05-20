import { View, Keyboard, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import TextInputStyled from "src/components/common/TextInputStyled";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";
import styles from "./styles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import { Picker } from "@react-native-picker/picker";

export default function RegisterEmployee() {
  // Callable cloud-function
  const functions = getFunctions();
  const registerEmployee = httpsCallable(functions, "registerEmployee");

  const navigation = useNavigation();

  // States for the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Roles that can be choosed from the select dropdown
  const roles = ["nurse", "doctor", "admin"];

  // Remove header when keyboard is shown
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      Alert.alert("Failed to confirm password");
      return;
    }

    // TODO: skifte til loading screen el. for å vise at den jobber

    const data = {
      email: email,
      password: password,
      displayName: name,
      role: role,
      employeeNumber: employeeNumber,
    };

    setIsLoading(true);

    registerEmployee(data)
      .then(() => {
        navigation.navigate("Employees");
      })
      .catch((message) => {
        setIsLoading(false);
        Alert.alert(message);
      });
  };

  return (
    <>
      <View style={styles.container}>
        {!keyboardOpen ? (
          <HeaderAndIcon
            title={"Register employee"}
            icon={"hospital-user"}
            iconColor={null}
          />
        ) : null}

        <ScrollView>
          <TextInputStyled
            placeholder={"Employee Id"}
            onChangeText={(id) => setEmployeeNumber(id)}
            secureTextEntry={false}
          />
          <TextInputStyled
            placeholder={"Full Name"}
            onChangeText={(name) => setName(name)}
            secureTextEntry={false}
          />
          <TextInputStyled
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            secureTextEntry={false}
          />
          <TextInputStyled
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <TextInputStyled
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(passwordConfirm) =>
              setPasswordConfirm(passwordConfirm)
            }
          />
          <Picker
            style={styles.picker}
            selectedValue={role}
            onValueChange={(selectedItem) => setRole(selectedItem)}
          >
            <Picker.Item label="Role" value="" />
            <Picker.Item label="Nurse" value="nurse" />
            <Picker.Item label="Doctor" value="doctor" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </ScrollView>

        <PrimaryButton title={"Add Employee"} onPress={handleRegister} />
        {isLoading ? <LoadingOverlay title="Registering employee..." /> : null}
      </View>
    </>
  );
}

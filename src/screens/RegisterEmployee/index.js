import { View, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import { theme } from "src/res/theme";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { db, auth } from "../../../firebase-config";
import { getFunctions, httpsCallable } from "firebase/functions";
import Header from "src/components/common/Header";
import { useNavigation } from "@react-navigation/native";

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

  // Roles that can be choosed from the select dropdown
  const roles = ["nurse", "doctor", "admin"];

  const handleRegister = async () => {
    console.log("registering");
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

    console.log(data);

    registerEmployee(data)
      .then((result) => {
        // read result of the cloud function
        console.log(result);
        const data = result.data;
        console.log(data);

        navigation.navigate("Employees");
      })
      .catch((message) => Alert.alert(message));
  };

  return (
    <>
      <View style={styles.container}>
        <Header title={"Register Employee"} />
        <ScrollView>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Employee Id"
              placeholderTextColor="#003f5c"
              onChangeText={(id) => setEmployeeNumber(id)}
            />
          </View>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#003f5c"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.largeBox}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(passwordConfirm) =>
                setPasswordConfirm(passwordConfirm)
              }
            />
          </View>

          {/* https://www.npmjs.com/package/react-native-select-dropdown#onFocus */}
          <SelectDropdown
            data={roles}
            defaultButtonText={"Profession"}
            onSelect={(selectedItem, index) => {
              setRole(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </ScrollView>

        <PrimaryButton title={"Cancel"} onPress={() => navigation.goBack()} />
        <PrimaryButton title={"Add Employee"} onPress={handleRegister} />
      </View>
    </>
  );
}

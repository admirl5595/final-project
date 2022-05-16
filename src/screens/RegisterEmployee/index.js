import { View, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import TextInputStyled from "src/components/common/TextInputStyled";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";
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

    registerEmployee(data)
      .then(() => {
        navigation.navigate("Employees");
      })
      .catch((message) => Alert.alert(message));
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderAndIcon
          title={"Register employee"}
          icon={"hospital-user"}
          iconColor={null}
        />
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

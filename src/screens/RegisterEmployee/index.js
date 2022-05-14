import { View, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import { theme } from "src/res/theme";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updateDoc,
  addDoc,
  doc,
} from "firebase/auth";
import { db, auth } from "../../../firebase-config";
import { getFunctions, httpsCallable } from "firebase/functions";

// TODO: Skal vi bruke google sin Sign in with email og så sette navn?
// navn er displayName

export default function RegisterEmployee() {
  const registerEmployee = httpsCallable(functions, "registerEmployee");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const roles = ["nurse", "doctor", "admin"];

  useEffect(() => {
    setName("Ole Ivars");
    setEmail("olei@uia.no");
    setEmployeeNumber("123456789");
    setPassword("Password1.");
    setRole("admin");
  }, []);

  const handleRegister = async () => {
    console.log("registering");
    // if (password !== passwordConfirm) {
    //   Alert.alert("Failed to confirm password");
    //   return;
    // }
    const newUser = {
      uid: employeeNumber,
      email: email,
      password: password,
      displayName: name,
      role: role,
      employeeNumber: employeeNumber,
    };

    registerEmployee(newUser).then((result) => {
      // read result of the cloud function
      console.log(result);
      const data = result.data;
      console.log(data);
    });
  };

  return (
    <>
      <View style={styles.container}>
        {/* TODO: Fikse styling på denne */}
        <ScrollView>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Employee Id"
              placeholderTextColor="#003f5c"
              // onChangeText={(id) => setEmployeeNumber(id)}
            />
          </View>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#003f5c"
              // onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.largeBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#003f5c"
              // onChangeText={(email) => setEmail(email)}
            />
          </View>

          {/* https://www.npmjs.com/package/react-native-select-dropdown#onFocus */}
          <SelectDropdown
            data={roles}
            defaultButtonText={"Profession"}
            onSelect={(selectedItem, index) => {
              // setRole(selectedItem);
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

          <View style={styles.largeBox}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              // onChangeText={(password) => setPassword(password)}
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
        </ScrollView>

        <PrimaryButton title={"Cancel"} onPress={() => navigation.goBack()} />
        <PrimaryButton title={"Add Employee"} onPress={handleRegister} />
      </View>
    </>
  );
}

const handleRegister = async () => {
  console.log("registering");
  // if (password !== passwordConfirm) {
  //   Alert.alert("Failed to confirm password");
  //   return;
  // }

  console.log("name :", name);
  console.log("email :", email);
  console.log("role :", role);
  console.log("employeeNumber :", employeeNumber);
  console.log("password :", password);

  auth
    .createUser({
      uid: employeeNumber,
      email: email,
      emailVerified: true,
      password: password,
      displayName: name,
      disabled: false,
      role: role,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      Alert.alert("Successfully created new user:", userRecord.uid);
    })
    .catch((error) => {
      Alert.alert("Error creating new user:", error);
    });
};

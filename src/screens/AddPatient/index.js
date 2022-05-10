import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";

// note: new patients are not admitted to a room by default

export default function AddPatient() {
  const navigation = useNavigation();

  const [gender, setGender] = useState("male");
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const patientCollectionRef = collection(db, "patients");

  // verify data and add patient
  const addPatient = async () => {
    if (name.length < 1) {
      Alert.alert("name invalid");
      return;
    }

    if (!age) {
      Alert.alert("enter age");
      return;
    }

    const newPatient = {
      name: name,
      age: age,
      gender: gender,
      admitted: false, // false by default
    };

    await addDoc(patientCollectionRef, newPatient);
    navigation.navigate("Patients");
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="name"
        style={styles.textInput}
      />
      <Picker
        style={styles.textInput}
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <TextInput
        keyboardType="numeric"
        onChangeText={setAge}
        value={age}
        placeholder="age"
        style={styles.textInput}
        maxLength={3}
      />
      <PrimaryButton onPress={addPatient} title="Register patient" />
    </View>
  );
}

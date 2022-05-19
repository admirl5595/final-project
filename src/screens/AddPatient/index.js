import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";
import { db } from "../../../firebase-config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";
import { theme } from "src/res/theme";
import SecondaryButton from "../../components/common/SecondaryButton";
import TextInputStyled from "../../components/common/TextInputStyled";

// note: new patients are not admitted to a room by default

export default function AddPatient() {
  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDob(currentDate);
  };

  const [gender, setGender] = useState("male");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [ssn, setSsn] = useState("");

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: dob,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // verify data and add patient
  const addPatient = async () => {
    if (name.length < 1) {
      Alert.alert("name invalid");
      return;
    }

    if (ssn.length !== 9) {
      Alert.alert("invalid ssn");
      return;
    }

    const newPatient = {
      name: name,
      dob: dob,
      gender: gender,
      admitted: false, // false by default
      ssn: ssn,
      breathRate: [],
      diastolicBP: [],
      systolicBP: [],
      heartRate: [],
      o2Level: [],
      observations: [],
    };

    const patientDocRef = doc(db, "patients", ssn);

    // check if patientDoc exists
    const patient = await getDoc(patientDocRef);

    if (patient.exists()) {
      Alert.alert("patient already exists");
      return;
    }

    await setDoc(patientDocRef, newPatient);
    navigation.navigate("Patients");
  };

  return (
    <View style={styles.container}>
      <TextInputStyled
        onChangeText={setName}
        value={name}
        placeholder="Name"
        style={styles.textInput}
      />
      <TextInputStyled
        keyboardType="numeric"
        onChangeText={setSsn}
        value={ssn}
        placeholder="Social security number"
        style={styles.textInput}
        maxLength={9}
      />
      <Picker
        style={styles.textInput}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Text placeholderText={"poop"} style={styles.textInput}>{dob.toDateString()}</Text>

      <PrimaryButton title="set DOB" onPress={showDatepicker} />

      <PrimaryButton onPress={addPatient} title="Register patient" />
    </View>
  );
}

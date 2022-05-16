import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";
import { db } from "../../../firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";
import { theme } from "src/res/theme";
import { useRoute } from "@react-navigation/native";

// note: new patients are not admitted to a room by default

export default function EditPatient() {
  const navigation = useNavigation();

  const route = useRoute();

  const patient = route.params.patient;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDob(currentDate);
  };

  const [gender, setGender] = useState(patient.gender);
  const [name, setName] = useState(patient.name);
  const [dob, setDob] = useState(patient.dob.toDate());
  const [ssn, setSsn] = useState(patient.ssn);

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
  const editPatient = async () => {
    if (name.length < 1) {
      Alert.alert("name invalid");
      return;
    }

    if (ssn.length !== 9) {
      Alert.alert("invalid ssn");
      return;
    }

    const updatedFields = {
      name: name,
      dob: dob,
      gender: gender,
      ssn: ssn,
    };

    const patientDocRef = doc(db, "patients", ssn);

    await updateDoc(patientDocRef, updatedFields);
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
      <TextInput
        keyboardType="numeric"
        onChangeText={setSsn}
        value={ssn}
        placeholder="social security number"
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

      <Text style={theme.textVariants.body}>Date of birth</Text>
      <Text style={styles.textInput}>{dob.toDateString()}</Text>

      <Button title="set DOB" onPress={showDatepicker} />

      <PrimaryButton onPress={editPatient} title="Edit patient" />
    </View>
  );
}

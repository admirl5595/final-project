import { View, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import TextInputStyled from "src/components/common/TextInputStyled";
import styles from "./styles";
import { theme } from "src/res/theme";
import { db, auth } from "../../../firebase-config";
import { getFunctions, httpsCallable } from "firebase/functions";
import Header from "src/components/common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateEmployee } from "../../services/crud-operations";
import { Picker } from "@react-native-picker/picker";

export default function EditEmployee() {
  // Callable cloud-function
  const functions = getFunctions();
  const deleteEmployee = httpsCallable(functions, "deleteEmployee");

  // Navigation hook
  const route = useRoute();
  const employee = route.params.employee;
  const navigation = useNavigation();

  // States for the form
  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    setName(employee.displayName);
    setRole(employee.role);
    setEmployeeNumber(employee.employeeNumber);
  }, []);

  const handleEdit = async () => {
    const data = {
      role: role,
      displayName: name,
      employeeNumber: employeeNumber,
    };
    updateEmployee(data)
      .then(() => {
        navigation.navigate("Employees");
      })
      .catch((message) => Alert.alert(message));
  };

  // Delete user in cloud-functions
  // delete user in users-collection
  // Add prompt
  const handleDelete = async () => {
    deleteEmployee(employeeNumber)
      .then(() => {
        navigation.navigate("Employees");
      })
      .catch((message) => Alert.alert(message));
  };

  return (
    <View style={styles.container}>

      <Header title={"EmployeeNr: " + employeeNumber} />
      <ScrollView>

        <TextInputStyled
          value={name}
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
          style={styles.textInput}
        />

        <Picker
          style={styles.picker}
          selectedValue={role}
          onValueChange={(selectedItem) => setRole(selectedItem)}
        >
          <Picker.Item label="Nurse" value="nurse" />
          <Picker.Item label="Doctor" value="doctor" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </ScrollView>

      <PrimaryButton title={"Save changes"} onPress={handleEdit} />
      <PrimaryButton title={"Delete Employee"} onPress={handleDelete} />
    </View>
  );
}

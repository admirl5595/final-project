import { View, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import TextInputStyled from "src/components/common/TextInputStyled";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { db, auth } from "../../../firebase-config";
import { getFunctions, httpsCallable } from "firebase/functions";
import Header from "src/components/common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateEmployee } from "../../services/crud-operations";

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

  // Roles that can be choosed from the select dropdown
  const roles = ["nurse", "doctor", "admin"];

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
          />


        {/* https://www.npmjs.com/package/react-native-select-dropdown#onFocus */}
        <SelectDropdown
          data={roles}
          defaultButtonText={role}
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

      <PrimaryButton title={"Save changes"} onPress={handleEdit} />
      <PrimaryButton title={"Delete Employee"} onPress={handleDelete} />
    </View>
  );
}

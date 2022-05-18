import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import Header from "src/components/common/Header";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";
import ListAttributes from "src/components/common/ListAttributes";

import { theme } from "src/res/theme";
import styles from "./styles";
import { getEmployees } from "../../services/crud-operations";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { auth } from "../../../firebase-config";


export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const currentUser = auth.currentUser;
  const userId = currentUser.uid;

  let filteredEmployees = [...employees].filter(
    (employee) => employee.id !== userId
  );

  // Navigation hooks
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function GetEmployees() {
      await getEmployees(setEmployees);
    }
    GetEmployees();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <HeaderAndIcon
        title={"Employees"}
        icon={"users"}
        iconColor={null}
      />
      <ListAttributes
        leftText={"Name"}
        rightText={"Role"} 
        />

      <FlatList
        data={filteredEmployees}
        renderItem={({ item }) => (
          <SecondaryButton
            onPress={() => {
              navigation.navigate("EditEmployee", { employee: item });
            }}
            leftText={item.displayName}
            rightText={item.role}
            key={item.employeeNumber}
          />
        )}
      />

      <PrimaryButton
        title={"Register"}
        onPress={() => {
          navigation.navigate("RegisterEmployee");
        }}
      />
    </View>
  );
}

import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import { theme } from "src/res/theme";
import styles from "./styles";
import { getEmployees } from "../../services/crud-operations";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

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
      <FlatList
        data={employees}
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

import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "src/components/common/PrimaryButton";
import SecondaryButton from "src/components/common/SecondaryButton";
import { theme } from "src/res/theme";
import styles from "./styles";
import { getEmployees } from "../../services/crud-operations";
import { useNavigation } from "@react-navigation/native";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function GetEmployees() {
      await getEmployees(setEmployees);
    }
    GetEmployees();
  }, []);

  return (
    <View style={styles.container}>

      {/* TODO: Fjerne style props, slik at btn er fast */}
      {/* <FlatList
        data={employees}
        renderItem={({ employee }) => (
          <SecondaryButton
            onPress={""}
            leftText={employee.displayName}
            rightText={employee.role}
            style={styles.btn}
            fontColor={theme.colors.secondary_fontColor}
          />
        )}
      /> */}
      <SecondaryButton
        onPress={""}
        leftText={"john"}
        rightText={"Nurse"}
        style={styles.btn}
        fontColor={theme.colors.secondary_fontColor}
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

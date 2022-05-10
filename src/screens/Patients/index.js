import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import PatientContext from "src/services/PatientContext";
import PatientItem from "./component";
import styles from "./style";
import PrimaryButton from "src/components/common/PrimaryButton";

export default function Patients({ navigation }) {
  const { patients } = useContext(PatientContext);

  console.log(patients);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Patients screen</Text>
      <FlatList
        data={patients}
        renderItem={({ item }) => <PatientItem patient={item} />}
      />
      <PrimaryButton
        title="Register patient"
        onPress={() => navigation.navigate("AddPatient")}
      />
    </View>
  );
}

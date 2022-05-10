import React, { useContext } from "react";
import { View, ScrollView, Text } from "react-native";
import DropDownItems from "./component";
import LogoutBtn from "../../components/auth/LogoutBtn";
import { auth } from "../../../firebase-config";
import PatientContext from "../../services/PatientContext";
import styles from "./styles";

export default function Settings({ navigation }) {
  const { patients } = useContext(PatientContext);

  // Show a settings interface for user
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userCard}>
          <Text style={styles.text}>
            Signed in as: {auth.currentUser.email}
          </Text>
        </View>
        <View>
          <DropDownItems
            listName="My Habits"
            list={[]}
            navigation={navigation}
          />
        </View>
        <View style={styles.centeredView}>
          <LogoutBtn />
        </View>
      </ScrollView>
    </View>
  );
}

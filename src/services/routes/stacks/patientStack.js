import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Patients from "src/screens/Patients";
import AddPatient from "src/screens/AddPatient";
import Settings from "src/screens/Settings/";
import mainScreenStyle from "../navigationStyling/mainScreensStyle";
import stackStyle from "../navigationStyling/stackStyling";
import EditPatient from "src/screens/EditPatient";

const options = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

const Stack = createNativeStackNavigator();

const PatientStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={mainScreenStyle}
        name="Patients"
        component={Patients}
      />
      <Stack.Screen
        options={stackStyle}
        name="AddPatient"
        component={AddPatient}
      />
      <Stack.Screen
        options={stackStyle}
        name="EditPatient"
        component={EditPatient}
      />

      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default PatientStack;

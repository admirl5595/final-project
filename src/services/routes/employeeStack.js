import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Employees from "src/screens/Employees";
import RegisterEmployee from "src/screens/RegisterEmployee";
import EditEmployee from "src/screens/EditEmployee";
import mainScreenStyle from "./navigationStyling/mainScreensStyle";
import stackStyle from "./navigationStyling/stackStyling";
import Settings from "src/screens/Settings/";

const options = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

const Stack = createNativeStackNavigator();

const EmployeeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={mainScreenStyle}
        name="Employees"
        component={Employees}
      />
      <Stack.Screen
        options={stackStyle}
        name="RegisterEmployee"
        component={RegisterEmployee}
      />
      <Stack.Screen
        options={stackStyle}
        name="EditEmployee"
        component={EditEmployee}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default EmployeeStack;

import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EmployeeStack from "./employeeStack";
import PatientStack from "./patientStack";
import RoomStack from "./roomStack";
import UserStack from "./userStack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { theme } from "src/res/theme";

// TODO: Finne en farge til disse
const focusedColor = theme.colors.topNavBar;
const unfocusedColor = "grey";

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIcon: ({ color }) => {
          // You can return any component that you like here!
          return <FontAwesomeIcon size={25} icon={"home"} color={color} />;
        },
        tabBarActiveTintColor: focusedColor,
        tabBarInactiveTintColor: unfocusedColor,
        headerShown: false,
      })}
    >
      {/* <Tab.Screen name="Admin Home" component={AdminHomeStack} /> */}
      <Tab.Screen name="Home " component={UserStack} />
    </Tab.Navigator>
  );
};


export default UserTabNavigator;

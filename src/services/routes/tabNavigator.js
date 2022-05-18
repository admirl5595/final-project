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

const AdminDrawerNavigator = () => {
  // TODO: Flytte tannhjulet ut hit
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home ":
                iconName = "home";
                break;

              case "Employees ":
                iconName = "users";
                break;

              case "Patients ":
                iconName = "bed-pulse";
                break;

              case "Rooms ":
                iconName = "hospital";
                break;
              default:
                iconName = "home";
                break;
            }

            // You can return any component that you like here!
            return <Icon icon={iconName} color={color} />;
          },
          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
          headerShown: false,
        })}
      >
        {/* <Tab.Screen name="Admin Home" component={AdminHomeStack} /> */}
        <Tab.Screen name="Home " component={UserStack} />
        <Tab.Screen name="Employees " component={EmployeeStack} />
        <Tab.Screen name="Patients " component={PatientStack} />
        <Tab.Screen name="Rooms " component={RoomStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function Icon({ icon, color }) {
  return <FontAwesomeIcon size={25} icon={icon} color={color} />;
}

const RootNavigator = () => {
  // TODO: Flytte tannhjulet ut hit
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          role === "admin" ? (
            <Stack.Screen name="Root" component={Root} />
          ) : (
            EmployeeScreens
          )
        ) : loading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          AuthScreens
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminDrawerNavigator;

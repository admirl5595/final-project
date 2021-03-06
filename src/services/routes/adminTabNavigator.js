import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EmployeeStack from "./stacks/employeeStack";
import PatientStack from "./stacks/patientStack";
import RoomStack from "./stacks/roomStack";
import UserStack from "./stacks/userStack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { theme } from "src/res/theme";

// TODO: Finne en farge til disse
const focusedColor = theme.colors.topNavBar;
const unfocusedColor = "grey";

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
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
  );
};

function Icon({ icon, color }) {
  return <FontAwesomeIcon size={25} icon={icon} color={color} />;
}

export default AdminTabNavigator;

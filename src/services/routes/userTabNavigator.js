import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserStack from "./stacks/userStack";
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

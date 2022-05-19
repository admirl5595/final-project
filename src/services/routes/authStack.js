import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import stackStyle from "./navigationStyling/stackStyling";

import LoginScreen from "src/screens/Login";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import AdminHome from "src/screens/AdminHome";

const options = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

const Stack = createNativeStackNavigator();

const AdminHomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminHome"
        component={AdminHome}
      />
    </Stack.Navigator>
  );
};
export default AdminHomeStack;

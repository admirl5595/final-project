import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Home from "src/screens/Home";
import Settings from "src/screens/Settings/";
import Room from "src/screens/Room";
import Monitor from "src/screens/Monitor";
import ViewObservations from "src/screens/ViewObservations";
import InsertObservationScreen from "src/screens/InsertObservation";
import stackStyle from "./navigationStyling/stackStyling";
import mainScreenStyle from "./navigationStyling/mainScreensStyle";

const options = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={mainScreenStyle} name="Home" component={Home} />
      <Stack.Screen options={stackStyle} name="Room" component={Room} />
      <Stack.Screen
        options={stackStyle}
        name="ViewObservations"
        component={ViewObservations}
      />
      <Stack.Screen
        options={stackStyle}
        name="InsertObservation"
        component={InsertObservationScreen}
      />
      <Stack.Screen
        options={stackStyle}
        name="Monitor"
        component={Monitor}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default UserStack;

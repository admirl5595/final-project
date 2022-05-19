import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import AddRoom from "src/screens/AddRoom";
import ManageRooms from "src/screens/ManageRooms";
import EditRoom from "src/screens/EditRoom";
import Settings from "src/screens/Settings/";

import mainScreenStyle from "./navigationStyling/mainScreensStyle";
import stackStyle from "./navigationStyling/stackStyling";

const options = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

const Stack = createNativeStackNavigator();

const RoomStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={mainScreenStyle}
        name="Rooms"
        component={ManageRooms}
      />
      <Stack.Screen options={stackStyle} name="EditRoom" component={EditRoom} />
      <Stack.Screen options={stackStyle} name="AddRoom" component={AddRoom} />
      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};
export default RoomStack;

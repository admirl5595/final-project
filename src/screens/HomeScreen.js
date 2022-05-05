import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "react-native-paper";
import PatientContext from "../../config/PatientContext";
import { getRooms } from "../services/crud-operations";

export default function HomeScreen({ navigation }) {
  const [ rooms, setRooms  ] = useState([])

     useEffect(() => {
     getRooms(setRooms);
   }, []);

  return(
    <Text>Hello</Text>
  )
};

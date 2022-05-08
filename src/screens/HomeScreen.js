import React, { useEffect, useState } from "react";

import {
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  Alert,
  Item,
  StyleSheet,
  StatusBar,
} from "react-native";

import { db, auth } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { getRooms } from "../services/crud-operations";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // get signed in user
  const user = auth.currentUser;

  // reference to user document
  const userDocRef = doc(db, "users", user.uid);

  const [role, setRole] = useState("");

  const [rooms, setRooms] = useState([]);

  useEffect(async () => {
    const userDoc = await getDoc(userDocRef);

    const userData = userDoc.data();

    setRole(userData.role);
  }, []);

  useEffect(async () => {
    getRooms(setRooms)
  }, []);

  const renderRoom = ({ item }) => (
    <Item room={item.roomNr} />
  );

  const Item = ({ roomNr }) => (
    <View style={styles.item}>
      <Text style={styles.room}>{roomNr}</Text>
    </View>
  );
  

  return (
    <View style={{ backgroundColor: "#95E9CE", flex: 1}}>
      <Text>EMPLOYEE SCREEN: {role}</Text>
      <Text>Room: {rooms.map(room => room.roomNr)}</Text>
      <Text>Patient: {rooms.map(room => room.name)}</Text>
      {console.log(rooms.map(room => (room.roomNr)))}
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  room: {
    fontSize: 32,
  },
});
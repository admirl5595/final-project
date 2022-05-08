import React, { useEffect, useState, useContext } from "react";

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
import RoomContext from "../../config/RoomContext";
import ListItem from "../components/home-screen/room-list-item/RoomListItem";
import { theme } from "../res/theme";

import LogoutBtn from "../components/auth/LogoutBtn";

export default function HomeScreen() {
  // get signed in user
  const user = auth.currentUser;

  // reference to user document
  const userDocRef = doc(db, "users", user.uid);

  const [role, setRole] = useState("");

  const { rooms, setRooms } = useContext(RoomContext);

  console.log(rooms);

  useEffect(() => {
    async function SetRole() {
      const userDoc = await getDoc(userDocRef);

      const userData = userDoc.data();

      setRole(userData.role);
    }
    SetRole();
  }, []);

  useEffect(() => {
    async function GetRooms() {
      await getRooms(setRooms);
    }
    GetRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={rooms} renderItem={ListItem} />
      <LogoutBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});

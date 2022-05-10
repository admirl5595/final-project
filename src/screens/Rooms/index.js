import React, { useEffect, useState, useContext } from "react";

import { View, Button, FlatList } from "react-native";

import { db, auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { getRooms } from "src/services/crud-operations";
import RoomContext from "src/services/RoomContext";
import RoomListItem from "./components/RoomListItem";

import PrimaryButton from "src/components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function Rooms() {
  // get signed in user
  const user = auth.currentUser;
  const navigation = useNavigation();
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
      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <RoomListItem
            item={item}
            goTo={role === "admin" ? "EditRoom" : null}
          />
        )}
      />
      {role === "admin" ? (
        <>
          <PrimaryButton
            onPress={() => navigation.navigate("AddRoom")}
            title="Add room"
          />
          <PrimaryButton
            onPress={() => navigation.navigate("AdminHome")}
            title="Admin Home"
          />
        </>
      ) : null}
    </View>
  );
}

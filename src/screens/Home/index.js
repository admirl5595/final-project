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

export default function Home() {
  // get signed in user
  const user = auth.currentUser;
  const navigation = useNavigation();
  // reference to user document

  const { rooms, setRooms } = useContext(RoomContext);

  console.log(rooms);

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
        renderItem={({ item }) => <RoomListItem item={item} />}
      />
    </View>
  );
}

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

export default function ManageRooms() {
  const navigation = useNavigation();
  // reference to user document
  const { rooms, setRooms } = useContext(RoomContext);

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
    </View>
  );
}

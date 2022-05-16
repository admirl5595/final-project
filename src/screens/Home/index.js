import React, { useEffect, useState, useContext } from "react";

import { View, Button, FlatList } from "react-native";

import { db, auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { getRooms } from "src/services/crud-operations";
import RoomContext from "src/services/RoomContext";

import PrimaryButton from "src/components/common/PrimaryButton";
import Header from "src/components/common/Header";
import ListAttributes from "src/components/common/ListAttributes";
import SecondaryButton from "src/components/common/SecondaryButton";

import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function Home() {
  // get signed in user
  const user = auth.currentUser;
  const navigation = useNavigation();
  // reference to user document

  const { rooms, setRooms } = useContext(RoomContext);

  console.log(rooms);

  let roomsCopy = [...rooms];

  let occupiedRooms = roomsCopy.filter((room) => room.name.length !== 0);

  useEffect(() => {
    async function GetRooms() {
      await getRooms(setRooms);
    }
    GetRooms();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={"Home"} />
      <ListAttributes leftText={"RoomNr"} rightText={"Patient Name"} />
      <FlatList
        data={occupiedRooms}
        renderItem={({ item }) => (
          <SecondaryButton
            onPress={() => navigation.navigate("Room", { room: item })}
            leftText={item.roomNr}
            rightText={item.name}
          />
        )}
      />
    </View>
  );
}

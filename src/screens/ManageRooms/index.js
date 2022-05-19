import React, { useEffect, useContext } from "react";

import { View, Button, FlatList } from "react-native";

import { getRooms } from "src/services/crud-operations";
import RoomContext from "src/services/RoomContext";
import RoomListItem from "./components/RoomListItem";


import ListAttributes from "src/components/common/ListAttributes";
import SecondaryButton from "src/components/common/SecondaryButton";
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
      <ListAttributes leftText={"RoomNr"} rightText={"Patient Name"} />
      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <SecondaryButton
            onPress={() => navigation.navigate("EditRoom", { room: item })}
            leftText={item.roomNr}
            rightText={item.name}
          />
        )}
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

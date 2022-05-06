import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { db, auth } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

export default function AdminScreen() {
  // get signed in user
  const user = auth.currentUser;

  // reference to user document
  const userDocRef = doc(db, "users", user.uid);

  const [role, setRole] = useState("");

  useEffect(async () => {
    const userDoc = await getDoc(userDocRef);

    const userData = userDoc.data();

    setRole(userData.role);
  }, []);

  return (
    <View>
      <Text>Hello, logged in as {role}</Text>
    </View>
  );
}

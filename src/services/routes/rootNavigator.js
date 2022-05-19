import React, { useState, useEffect } from "react";

import { auth, db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tabNavigator";
import UserStack from "./userStack";
import LoadingScreen from "src/screens/Loading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./authStack";

export default function RootNavigator() {
  // listen to user authentication state
  const [user, loading] = useAuthState(auth);

  const [role, setRole] = useState("");

  useEffect(() => {
    async function getRole() {
      if (user) {
        // get signed in user
        const user = auth.currentUser;

        // reference to user document
        const userDocRef = doc(db, "users", user.uid);

        const userDoc = await getDoc(userDocRef);

        const userData = userDoc.data();

        setRole(userData.role);
      }
    }
    getRole();
  }, [user]);

  const Stack = createNativeStackNavigator();


  console.log(role)

  // TODO: Flytte tannhjulet ut hit
  return (
    <NavigationContainer>
      {user ? (
        role === "admin" ? (
          <TabNavigator />
        ) : (
          <UserStack />
        )
      ) : loading ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

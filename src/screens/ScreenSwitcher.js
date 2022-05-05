import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "react-firebase-hooks/auth";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import LoadingScreen from "./LoadingScreen";
import HomeScreen from "./HomeScreen";
import Settings from "./Settings";
import AdminScreen from "./AdminScreen";

import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";

import { auth, db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

// conditional rendering for authenticated vs unauthenticated users
const ScreenSwitcher = () => {
  const Stack = createNativeStackNavigator();

  const options = ({ navigation }) => ({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
      </TouchableOpacity>
    ),
  });

  const EmployeeScreens = (
    <>
      <Stack.Screen
        options={options}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </>
  );

  const AdminScreens = (
    <>
      <Stack.Screen
        options={options}
        name="AdminScreen"
        component={AdminScreen}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </>
  );

  const AuthScreens = (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </>
  );

  // listen to user authentication state
  const [user, loading] = useAuthState(auth);

  // get signed in user
  const userData = auth.currentUser;

  // reference to user document
  const userDocRef = doc(db, "users", userData.uid);

  const [role, setRole] = useState("");

  useEffect(async () => {
    const userDoc = await getDoc(userDocRef);

    const userData = userDoc.data();

    setRole(userData.role);

    console.log(role);
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          role === "admin" ? (
            AdminScreens
          ) : (
            EmployeeScreens
          )
        ) : loading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          AuthScreens
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenSwitcher;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "react-firebase-hooks/auth";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import LoadingScreen from "./LoadingScreen";
import HomeScreen from "./HomeScreen";
import Settings from "./Settings";

import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";

import { auth } from "../firebase-config";

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

  const AppScreens = (
    <>
      <Stack.Screen
        options={options}
        name="HomeScreen"
        component={HomeScreen}
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          AppScreens
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

import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "react-firebase-hooks/auth";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import LoadingScreen from "../screens/Loading";
import Rooms from "../screens/Rooms";
import Settings from "../screens/Settings/";
import Room from "../screens/Room";
import Monitor from "../screens/Monitor";
import ViewObservations from "../screens/ViewObservations";
import InsertObservationScreen from "../screens/InsertObservation";
import AdminHome from "../screens/AdminHome";
import AddRoom from "src/screens/AddRoom";

import LoginScreen from "../screens/Auth/Login";
import RegisterScreen from "../screens/Auth/Register";

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
      <Stack.Screen options={options} name="Rooms" component={Rooms} />
      <Stack.Screen options={options} name="Room" component={Room} />
      <Stack.Screen
        options={options}
        name="ViewObservations"
        component={ViewObservations}
      />
      <Stack.Screen
        options={options}
        name="InsertObservation"
        component={InsertObservationScreen}
      />
      <Stack.Screen options={options} name="Monitor" component={Monitor} />
      <Stack.Screen name="Settings" component={Settings} />
    </>
  );

  // admin has access to additional screens
  const AdminScreens = (
    <>
      <Stack.Screen options={options} name="AdminHome" component={AdminHome} />
      <Stack.Screen options={options} name="AddRoom" component={AddRoom} />
      {EmployeeScreens}
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

        console.log(role);
      }
    }

    getRole();
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

import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "react-firebase-hooks/auth";

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import LoadingScreen from "../screens/Loading";
import Home from "../screens/Home";
import Settings from "../screens/Settings/";
import Room from "../screens/Room";
import Monitor from "../screens/Monitor";
import ViewObservations from "../screens/ViewObservations";
import InsertObservationScreen from "../screens/InsertObservation";
import AdminHome from "../screens/AdminHome";
import AddRoom from "../screens/AddRoom";
import Patients from "../screens/Patients";
import AddPatient from "../screens/AddPatient";
import Employees from "../screens/Employees";
import RegisterEmployee from "../screens/RegisterEmployee";
import EditEmployee from "../screens/EditEmployee";
import ManageRooms from "../screens/ManageRooms";
import EditRoom from "../screens/EditRoom";

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
      <Stack.Screen options={options} name="Home" component={Home} />
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
      <Stack.Screen
        name="Monitor"
        component={Monitor}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </>
  );

  // admin has access to additional screens
  const AdminScreens = (
    <>
      <Stack.Screen options={options} name="AdminHome" component={AdminHome} />
      <Stack.Screen options={options} name="Employees" component={Employees} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RegisterEmployee"
        component={RegisterEmployee}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditEmployee"
        component={EditEmployee}
      />
      <Stack.Screen
        options={options}
        name="ManageRooms"
        component={ManageRooms}
      />
      <Stack.Screen options={options} name="EditRoom" component={EditRoom} />
      <Stack.Screen options={options} name="AddRoom" component={AddRoom} />
      <Stack.Screen options={options} name="Patients" component={Patients} />
      <Stack.Screen
        options={options}
        name="AddPatient"
        component={AddPatient}
      />
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

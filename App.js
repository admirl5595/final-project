import React, { useState } from "react";

import { LogBox } from "react-native";
// prevent annoying yellow warning
LogBox.ignoreLogs(["Setting a timer"]);

import * as Notifications from "expo-notifications";

import ScreenSwitcher from "./src/screens/ScreenSwitcher";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faM,
  faW,
  faS,
  faT,
  faF,
  faCircle,
  faClock,
  faCalendar,
  faPlusCircle,
  faPersonRunning,
  faPersonSwimming,
  faFishFins,
  faTrash,
  faCircleExclamation,
  faFaceGrinTears,
  faCircleCheck,
  faFutbol,
  faSkiing,
  faDumbbell,
  faKeyboard,
  faCaretUp,
  faCaretDown,
  faCaretRight,
  faCaretLeft,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faM,
  faW,
  faS,
  faT,
  faF,
  faCircle,
  faClock,
  faCalendar,
  faPlusCircle,
  faPersonRunning,
  faPersonSwimming,
  faFishFins,
  faTrash,
  faCircleExclamation,
  faFaceGrinTears,
  faCircleCheck,
  faFutbol,
  faSkiing,
  faDumbbell,
  faKeyboard,
  faCaretUp,
  faCaretDown,
  faCaretRight,
  faCaretLeft,
  faGear
);

import HabitsContext from "./config/HabitsContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [habits, setHabits] = useState([]);

  // conditional rendering of screens
  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      <ScreenSwitcher />
    </HabitsContext.Provider>
  );
};

export default App;

import * as Notifications from "expo-notifications";

const notificationSetup = (notificationListener, responseListener) => {
  registerForPushNotificationsAsync();

  Notifications.getAllScheduledNotificationsAsync().then((notifications) => {});

  notificationListener.current =
    Notifications.addNotificationReceivedListener();

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener();

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
};

// get notification access token
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    // create channel with "Habit reminders" as identifier with object defining behaviour
    Notifications.setNotificationChannelAsync("Habit reminders", {
      name: "Habit reminders",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default notificationSetup;

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

// patient: patient in question
// vitalValue: value that was abnormal (eg: 200)
// vitalType: which vital triggered the function (eg: 'HR' (heartrate))
const triggerAbnormalVitalNotifcation = (patient, vitalValue, vitalType) => {
  const name = patient.name;
  const patientId = patient.id;
  console.log(
    "Detected abnormal observation in " +
      name +
      "'s " +
      vitalType +
      ": " +
      vitalValue
  );

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Abnormal observation detected",
      body: vitalType + ": " + vitalValue,
    },
    trigger: null /* triggers instantly */,
  });
};

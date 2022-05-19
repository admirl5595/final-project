import * as Notifications from "expo-notifications";

// patient: patient in question
// vitalValue: value that was abnormal (eg: 200)
// vitalType: which vital triggered the function (eg: 'HR' (heartrate))
const triggerAbnormalVitalNotifcation = (patient, vitalValue, vitalType) => {
  const name = patient.name;
  const patientId = patient.id;

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Abnormal observation detected for patient:" + patientId,
      body: vitalType + ": " + vitalValue,
    },
    trigger: null /* triggers instantly */,
  });
};

export default triggerAbnormalVitalNotifcation;

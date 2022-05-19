// functions check to see if vital readings are abnormal
export const checkBreathRate = (lastBreathRate) => {
  // check abnormal breath rate
  // above 25 or below 12
  if (lastBreathRate < 12 || lastBreathRate > 25) {
    return true;
  }

  return false;
};

export const checkHeartRate = (lastHeartRate) => {
  // check abnormal heart rate
  // above 130 or below 60
  if (lastHeartRate < 60 || lastHeartRate > 130) {
    return true;
  }
  return false;
};
export const checko2Level = (lasto2Level) => {
  // check o2Level
  // below 90%
  if (lasto2Level < 90) {
    return true;
  }

  return false;
};
export const checkSystolicBP = (lastSystolicBP) => {
  // above 120 mmHg or below 90 mmHg
  if (lastSystolicBP < 90 || lastSystolicBP > 120) {
    return true;
  }

  return false;
};
export const checkDiastolicBP = (lastDiastolicBP) => {
  // check diastolicBP
  // above 80 mmHg or below 60 mmHg
  if (lastDiastolicBP < 60 || lastDiastolicBP > 80) {
    return true;
  }
  return false;
};

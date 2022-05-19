// functions check to see if vital readings are abnormal
export const checkBreathRate = (lastBreathRate) => {
  // check abnormal breath rate
  // above 25 or below 12
  if (lastBreathRate < 5 || lastBreathRate > 35) {
    return true;
  }

  return false;
};

export const checkHeartRate = (lastHeartRate) => {
  // check abnormal heart rate
  // above 130 or below 60
  if (lastHeartRate < 45 || lastHeartRate > 130) {
    return true;
  }
  return false;
};
export const checko2Level = (lasto2Level) => {
  // check o2Level
  // below 90%
  if (lasto2Level < 81) {
    return true;
  }

  return false;
};
export const checkSystolicBP = (lastSystolicBP) => {
  // above 120 mmHg or below 90 mmHg
  if (lastSystolicBP < 86 || lastSystolicBP > 140) {
    return true;
  }

  return false;
};
export const checkDiastolicBP = (lastDiastolicBP) => {
  // check diastolicBP
  // above 80 mmHg or below 60 mmHg
  if (lastDiastolicBP < 40 || lastDiastolicBP > 100) {
    return true;
  }
  return false;
};

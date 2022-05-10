import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  textInput: {
    backgroundColor: theme.colors.secondary_fontColor,
  },
});

export default styles;

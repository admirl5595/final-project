import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    alignContent: "center", 
    padding: theme.spacing.s,
  },
  textInput: {
    backgroundColor: theme.colors.secondary_fontColor,
    marginVertical: theme.spacing.s,
    padding: theme.spacing.s,
  },
});

export default styles;

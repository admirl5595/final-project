import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.secondary_fontColor,
    borderWidth: 1,
    borderColor: "black",
    alignContent: "space-around",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    ...theme.textVariants.body,
  },
});

export default styles;

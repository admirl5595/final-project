import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: theme.spacing.s,
    marginVertical: theme.spacing.s,
    backgroundColor: theme.colors.secondary_fontColor,
    padding: theme.spacing.m,

    justifyContent: "space-between",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: theme.spacing.s,
  },
  text: {
    ...theme.textVariants.header,
    color: theme.colors.background,
    marginHorizontal: theme.spacing.s,
  },
});

export default styles;

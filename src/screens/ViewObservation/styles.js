import { StyleSheet } from "react-native";
import { theme } from "../../res/theme";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: theme.colors.background,
  },
  header: {
    margin: theme.spacing.xl,
    ...theme.textVariants.header,
    color: theme.colors.secondary_fontColor,
  },
  chartBox: {
    margin: theme.spacing.l,
  },
});

export default styles;

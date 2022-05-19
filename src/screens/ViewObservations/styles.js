import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  header: {
    margin: theme.spacing.xl,
    ...theme.textVariants.bigHeader,
    color: theme.colors.secondary_fontColor,
    textAlign: "center",
  },
  chartBox: {
    margin: theme.spacing.s,
    padding: theme.spacing.s,
  },
});

export default styles;

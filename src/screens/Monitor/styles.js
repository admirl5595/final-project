import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: theme.colors.background,
  },
  header: {
    marginTop: theme.spacing.xl,
    ...theme.textVariants.header,
  },
  headerRotated: {
    margin: theme.spacing.m,
    ...theme.textVariants.header,
  },
  icon: {
    margin: theme.spacing.l,
  },
});

export default styles;

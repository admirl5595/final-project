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
  largeBox: {
    ...theme.boxSize.l,
    ...theme.boxType.unfilled,
    margin: theme.spacing.m,
  },
  smallBox: {
    ...theme.boxSize.s,
    ...theme.boxType.unfilled,
    margin: theme.spacing.m,
  },
});

export default styles;

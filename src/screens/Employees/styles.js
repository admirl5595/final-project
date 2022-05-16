import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  btn: {
    ...theme.boxSize.l,
    ...theme.boxType.filled,
    margin: theme.spacing.m,
  },
});

export default styles;

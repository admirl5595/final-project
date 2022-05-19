import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  btn: {
    ...theme.boxSize.l,
    ...theme.boxType.filled,
    margin: theme.spacing.m,
  },
});

export default styles;

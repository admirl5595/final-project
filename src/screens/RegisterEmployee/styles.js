import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
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

import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: theme.spacing.m,
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
  picker: {
    backgroundColor: "#fff",
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
    ...theme.boxSize.xl,
    ...theme.boxType.unfilled,
    margin: theme.spacing.s,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 3,
  }
});

export default styles;

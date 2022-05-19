import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.s,
  },
  largeBox: {
    ...theme.boxSize.s,
    ...theme.boxType.unfilled,
    margin: theme.spacing.s,
  },
  smallBox: {
    ...theme.boxSize.s,
    ...theme.boxType.unfilled,
    margin: theme.spacing.s,
  },
  textInput: {
    backgroundColor: "#fff",
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
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

import { theme } from "src/res/theme";
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: theme.spacing.m,

  },
  input: {
    backgroundColor: theme.colors.secondary_fontColor,
    padding: theme.spacing.s,
    marginBottom: theme.spacing.l,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 3,
  },
  textHeader: {
    ...theme.textVariants.header,
    textAlign: "center",
    marginVertical: theme.spacing.xl,
    color: theme.colors.secondary_fontColor,
  },
});

export default styles;
import { theme } from "src/res/theme";
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: theme.spacing.m,
    paddingTop: "30%",
  },
  input: {
    backgroundColor: theme.colors.secondary_fontColor,
    padding: theme.spacing.s,
    marginBottom: theme.spacing.l,
  },
  textHeader: {
    ...theme.textVariants.header,
    textAlign: "center",
    marginVertical: theme.spacing.xl,
  },
});

export default styles;
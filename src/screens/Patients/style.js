import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: theme.spacing.s,
  },
  textHeader: {
    ...theme.textVariants.bigHeader,
  },
  textInput: {
    backgroundColor: "#fff",
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
  },
});

export default styles;

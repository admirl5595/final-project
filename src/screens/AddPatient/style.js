import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.s,
  },
  textInput: {
    backgroundColor: "#fff",
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
    ...theme.shadowVariants.shadowInput,
    margin: theme.spacing.s,
  },
});

export default styles;

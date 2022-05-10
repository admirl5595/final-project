import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  textHeader: {
    ...theme.textVariants.bigHeader,
  },
});

export default styles;

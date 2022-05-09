import { StyleSheet } from "react-native";
import { theme } from "../../res/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: theme.colors.background,
  },
  header: {
    margin: theme.spacing.xl,
    ...theme.textVariants.header,
  },
  button: {
    ...theme.boxSize.l,
    ...theme.boxType.filled,
    margin: theme.spacing.m,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: theme.spacing.s,
  },
  btnText: {
    ...theme.textVariants.body,
    color: theme.colors.primary_fontColor,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { theme } from "../../res/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: theme.colors.background,
    },
    header: {
        margin: theme.spacing.xl,
        ...theme.textVariants.header,
    },
    chartBox: {
        margin: theme.spacing.l,
    },
});

export default styles;

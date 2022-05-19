import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.background,
    flex: 1
  },
  userCard: {
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  centeredView: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;

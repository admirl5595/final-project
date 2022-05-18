import { StyleSheet } from "react-native";
import { theme } from "src/res/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(138,241,219,0.6)",
    borderRadius: 30,
    width: "70%",
    marginBottom: 20,
  },
  FocusedInputView: {
    borderWidth: 2,
    borderColor: "black",
  },
  TextInput: {
    padding: 10,
    textAlign: "center",
    color: "#003f5c",
  },
  btn: {
    width: "40%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgba(138,241,180,1)",
  },
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "rgba(138,241,219,1)",
    borderColor: "grey",
  },

  btnText: {
    textAlign: "center",
  },
  img: {
    width: 200,
    height: 200,
    margin: 20,
    borderRadius: 50,
  },
  text: {
    ...theme.textVariants.body,
    fontWeight: "bold",
  },
});

export default styles;

import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { theme } from "src/res/theme";

const mainScreenStyle = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: theme.colors.topNavBar,
  },
  headerTintColor: theme.colors.secondary_fontColor,
  headerTitleStyle: {
    ...theme.textVariants.bigHeader,
  },
  headerTitleAlign: "center",
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

export default mainScreenStyle;

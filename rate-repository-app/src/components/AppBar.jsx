import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "violet",
    padding: "10",
    flexDirection: "row",
  },

  scrollView: {
    flexDirection: "row",
    gap: 10,
  },
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          <Link to={"/"}>
            <Text fontSize={"heading"} fontWeight={"bold"}>
              Repositories
            </Text>
          </Link>

          <Link to={"/signin"}>
            <Text fontSize={"heading"} fontWeight={"bold"}>
              Sign in
            </Text>
          </Link>
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;

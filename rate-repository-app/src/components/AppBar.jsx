import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { CURRENT_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#d7d3d35e",
    padding: "10",
    flexDirection: "row",
  },

  scrollView: {
    flexDirection: "row",
    gap: 10,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(CURRENT_USER);
  const currentUser = data?.me;

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          <Link to={"/"}>
            <Text fontSize={"heading"} fontWeight={"bold"}>
              Repositories
            </Text>
          </Link>

          {currentUser ? (
            <Link to={"/review"}>
              <Text fontSize={"heading"} fontWeight={"bold"}>
                Create a review
              </Text>
            </Link>
          ) : null}

          {currentUser ? (
            <Pressable onPress={signOut}>
              <Text fontSize={"heading"} fontWeight={"bold"}>
                Sign out
              </Text>
            </Pressable>
          ) : (
            <>
              <Link to={"/signin"}>
                <Text fontSize={"heading"} fontWeight={"bold"}>
                  Sign in
                </Text>
              </Link>

              <Link to={"/signup"}>
                <Text fontSize={"heading"} fontWeight={"bold"}>
                  Sign up
                </Text>
              </Link>
            </>
          )}
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;

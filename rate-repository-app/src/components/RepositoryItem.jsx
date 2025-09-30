import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { formatCount } from "../utils/formatCount";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
  },
  innerContainer: {
    flexDirection: "row",
    paddingTop: 5,
  },
  innerContainer2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: "10",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imageContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  contentContainer: {
    padding: 10,
    gap: 5,
    flex: 1,
    flexShrink: 1,
  },
  languageStyles: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    padding: 5,
    color: "white",
    borderRadius: 2,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
});

const RepositoryItem = ({ repository, showButton }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text fontWeight={"bold"}>{repository.fullName}</Text>
          <Text color={"textSecondary"}>{repository.description}</Text>

          <Text style={styles.languageStyles}>{repository.language}</Text>
        </View>
      </View>

      <View style={styles.innerContainer2}>
        <View style={{ alignItems: "center", gap: "5" }}>
          <Text fontWeight={"bold"}>
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text color={"textSecondary"}>Stars</Text>
        </View>

        <View style={{ alignItems: "center", gap: "5" }}>
          <Text fontWeight={"bold"}>{formatCount(repository.forksCount)}</Text>
          <Text color={"textSecondary"}>Forks</Text>
        </View>

        <View style={{ alignItems: "center", gap: "5" }}>
          <Text fontWeight={"bold"}>{formatCount(repository.reviewCount)}</Text>
          <Text color={"textSecondary"}>Reviews</Text>
        </View>

        <View style={{ alignItems: "center", gap: "5" }}>
          <Text fontWeight={"bold"}>
            {formatCount(repository.ratingAverage)}
          </Text>
          <Text color={"textSecondary"}>Rating</Text>
        </View>
      </View>

      {showButton && (
        <Pressable
          style={styles.buttonStyle}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text fontWeight={"bold"} style={{ color: "white" }}>
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;

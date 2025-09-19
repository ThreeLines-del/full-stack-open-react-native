import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

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
  },
  languageStyles: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    padding: 5,
    color: "white",
    borderRadius: 2,
  },
});

const RepositoryItem = ({ repository }) => {
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return count.toString();
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RepositoryItem;

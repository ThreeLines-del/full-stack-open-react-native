import { StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  parentContainer: {
    minHeight: 150,
    flexDirection: "row",
    backgroundColor: "white",
  },
  ratingContainer: {
    width: 70,
    alignItems: "center",
    paddingTop: 10,
  },
  textContainer: {
    paddingVertical: 10,
    flexShrink: 1,
    paddingRight: 5,
    gap: 3,
  },
  ratingCircle: {
    borderWidth: 1.5,
    padding: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: theme.colors.primary,
  },
});

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);
  return (
    <View style={styles.parentContainer}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingCircle}>
          <Text color={"primary"} fontWeight={"bold"} fontSize={"heading"}>
            {review.rating}
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight={"bold"}>{review.user.username}</Text>
        <Text color={"textSecondary"} style={{ marginBottom: 5 }}>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;

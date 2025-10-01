import { Alert, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  outerParentContainer: {
    backgroundColor: "white",
    minHeight: 100,
  },
  parentContainer: {
    flexDirection: "row",
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
    flex: 1,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    paddingVertical: 10,
  },
  button: {
    padding: 12,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
});

const ReviewItem = ({ review, showButtons, refetch }) => {
  const date = new Date(review.createdAt);
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteReview({
              variables: {
                deleteReviewId: review.id,
              },
            });

            if (refetch) {
              await refetch();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.outerParentContainer}>
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
      {showButtons && (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              navigate(`/repository/${review.repositoryId}`);
            }}
            style={styles.button}
          >
            <Text fontWeight={"bold"} style={{ color: "white" }}>
              View repository
            </Text>
          </Pressable>

          <Pressable
            onPress={handleDeleteReview}
            style={[styles.button, { backgroundColor: "#ff6c6cff" }]}
          >
            <Text fontWeight={"bold"} style={{ color: "white" }}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;

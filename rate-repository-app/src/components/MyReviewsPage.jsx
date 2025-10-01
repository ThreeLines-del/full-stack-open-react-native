import { useQuery } from "@apollo/client/react";
import { FlatList, StyleSheet, View } from "react-native";
import { CURRENT_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  seperator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.seperator} />;

const MyReviewsPage = () => {
  const { data, loading, refetch } = useQuery(CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  });
  const reviews = data?.me?.reviews;

  const reviewNodes = data?.me ? reviews.edges.map((edge) => edge.node) : [];

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          key={item.id}
          review={item}
          showButtons={true}
          refetch={refetch}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviewsPage;

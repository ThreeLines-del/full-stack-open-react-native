import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client/react";
import { SINGLE_REPO } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  seperator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} showButton={true} />;
};

const ItemSeparator = () => <View style={styles.seperator} />;

const RepositoryPage = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(SINGLE_REPO, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: "cache-and-network",
  });

  const reviewNodes = data?.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={data.repository} />
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryPage;

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Link } from "react-router-native";
import { useState } from "react";
import OrderPicker from "./OrderPicker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchbar: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderValues = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    label: "Latest repositories",
  },
  highest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
    label: "Highest rated repositories",
  },
  lowest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
    label: "Lowest rated repositories",
  },
};

export const RepositoryListContainer = ({
  repositories,
  selectedOption,
  setSelectedOption,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link key={item.id} to={`/repository/${item.id}`}>
          <RepositoryItem repository={item} showButton={false} />
        </Link>
      )}
      ListHeaderComponent={
        <View>
          <Searchbar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="search"
            style={styles.searchbar}
          />
          <OrderPicker
            orderValues={orderValues}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={1}
    />
  );
};

const RepositoryList = () => {
  const [selectedOption, setSelectedOption] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [value] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    orderBy: orderValues[selectedOption].orderBy,
    orderDirection: orderValues[selectedOption].orderDirection,
    searchKeyword: value,
    first: 5,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOption={selectedOption}
      searchQuery={searchQuery}
      setSelectedOption={setSelectedOption}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;

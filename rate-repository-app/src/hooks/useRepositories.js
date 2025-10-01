import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderPrinciple, searchKeyword) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderPrinciple.orderBy,
      orderDirection: orderPrinciple.orderDirection,
      searchKeyword,
    },
  });

  const repositories = data?.repositories;

  return { repositories, loading };
};

export default useRepositories;

import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { formatCount } from "../../utils/formatCount";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      //   screen.debug();

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // firstItem
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.fullName,
        {
          exact: false,
        }
      );
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.description,
        {
          exact: false,
        }
      );
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.language,
        {
          exact: false,
        }
      );
      expect(firstRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[0].node.ratingAverage).toString(),
        {
          exact: false,
        }
      );
      expect(firstRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[0].node.reviewCount).toString(),
        {
          exact: false,
        }
      );
      expect(firstRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[0].node.stargazersCount).toString(),
        {
          exact: false,
        }
      );
      expect(firstRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[0].node.forksCount).toString(),
        {
          exact: false,
        }
      );

      // secondItem
      expect(secondRepositoryItem).toHaveTextContent(
        "async-library/react-async",
        {
          exact: false,
        }
      );
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.description,
        {
          exact: false,
        }
      );
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.language,
        {
          exact: false,
        }
      );
      expect(secondRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[1].node.ratingAverage).toString(),
        {
          exact: false,
        }
      );
      expect(secondRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[1].node.reviewCount).toString(),
        {
          exact: false,
        }
      );
      expect(secondRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[1].node.stargazersCount).toString(),
        {
          exact: false,
        }
      );
      expect(secondRepositoryItem).toHaveTextContent(
        formatCount(repositories.edges[1].node.forksCount).toString(),
        {
          exact: false,
        }
      );
    });
  });
});

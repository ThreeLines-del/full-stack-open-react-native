import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          description
          language
          forksCount
          id
          ratingAverage
          reviewCount
          ownerAvatarUrl
          stargazersCount
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const SINGLE_REPO = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      fullName
      description
      language
      forksCount
      id
      ratingAverage
      reviewCount
      ownerAvatarUrl
      stargazersCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

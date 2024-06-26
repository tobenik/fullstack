import { gql } from "@apollo/client";
import { FULL_REPO } from "./fragments";

export const GET_REPOS = gql`
  query {
    repositories {
      edges {
        node {
          ...FullRepo
        }
      }
    }
  }
  ${FULL_REPO}
`;

export const GET_REPO = gql`
  query getRepo($id: ID!) {
    repository(id: $id) {
      ...FullRepo
    }
  }
  ${FULL_REPO}
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    repository(id: $id) {
      id
      fullName
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

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

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

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

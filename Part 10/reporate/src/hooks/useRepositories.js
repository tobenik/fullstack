import { useQuery } from "@apollo/client";
import { GET_REPOS } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOS, {
    fetchPolicy: "cache-and-network",
  });

  const repositories = data ? data.repositories : [];
  return { repositories, error, loading };
};

export default useRepositories;

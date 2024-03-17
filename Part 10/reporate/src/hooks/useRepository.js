import { useQuery } from "@apollo/client";
import { GET_REPO } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading } = useQuery(GET_REPO, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data ? data.repository : null;

  return { repository, loading };
};

export default useRepository;

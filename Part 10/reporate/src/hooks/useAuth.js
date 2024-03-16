import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMe = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const user = data ? data.me : null;
  return { user, error, loading };
};

export default useMe;

import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id) => {
  const { data, loading } = useQuery(GET_REVIEWS, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data
    ? data.repository
      ? data.repository.reviews
      : null
    : null;

  return { reviews, loading };
};

export default useReviews;

import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import Text from "../Text";
import useReviews from "../../hooks/useReviews";
import { FlatList, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Header = () => {
  const { repository } = useRepository(id);
  return repository ? (
    <RepositoryItem item={repository} fullView={true} />
  ) : (
    <Text>Loading...</Text>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const params = useParams();
  const id = params.id;

  const { reviews } = useReviews(id);

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return reviewNodes ? (
    <FlatList
      ListHeaderComponent={Header}
      ItemSeparatorComponent={ItemSeparator}
      data={reviewNodes}
      renderItem={({ item }) => <Text>{item.text}</Text>}
    />
  ) : (
    <Text>Loading...</Text>
  );
};

export default RepositoryView;

import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import Text from "../Text";

const RepositoryView = () => {
  const params = useParams();
  const id = params.id;
  const { repository } = useRepository(id);
  return repository ? (
    <RepositoryItem item={repository} fullView={true} />
  ) : (
    <Text>Loading...</Text>
  );
};

export default RepositoryView;

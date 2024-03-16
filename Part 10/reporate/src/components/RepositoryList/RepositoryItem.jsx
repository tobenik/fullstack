import { Image, View, StyleSheet, Pressable } from "react-native";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  profile: {
    flexDirection: "row",
    marginBottom: 0,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  hero: {
    marginLeft: 20,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  languageCard: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  stat: {
    marginVertical: 2,
    alignItems: "center",
  },
});

const formatCount = (count) => {
  return count > 1000 ? `${(count / 1000).toFixed(1)}k` : count;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.hero}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Pressable style={styles.languageCard}>
            <Text style={{ color: "white" }}>{item.language}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{formatCount(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{formatCount(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

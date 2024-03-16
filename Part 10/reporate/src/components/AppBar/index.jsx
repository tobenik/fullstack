import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "../Text";
import { Link } from "react-router-native";
import useAuthStorage from "../../hooks/useAuthStorage";
import useMe from "../../hooks/useAuth";
import useSignOut from "../../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  item: {
    padding: 10,
  },
});

const AppBarItem = ({ title, link }) => {
  return (
    <Pressable style={styles.item}>
      <Link to={link}>
        <Text style={styles.title}>{title}</Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  const { user } = useMe();
  const [signOut] = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarItem title="Repositories" link="/" />
        {user ? (
          <Pressable style={styles.item} onPress={() => signOut()}>
            <Text style={styles.title}>Sign out</Text>
          </Pressable>
        ) : (
          <AppBarItem title="Sign in" link="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

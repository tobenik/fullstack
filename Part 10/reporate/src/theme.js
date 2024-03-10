import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
const appbar_styles = StyleSheet.create({
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
});

const theme = StyleSheet.create({
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  appbar: appbar_styles,
});

export default theme;

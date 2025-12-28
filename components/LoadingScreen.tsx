import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreenContainer}>
      <ActivityIndicator size={"large"} color={"#19AA59"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
});

export default LoadingScreen;

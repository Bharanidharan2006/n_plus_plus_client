import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const Home = () => {
  useEffect(() => {
    const accessToken = SecureStore.getItem("accessToken");
    const refreshToken = SecureStore.getItem("refreshToken");
    console.log(accessToken, refreshToken);
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

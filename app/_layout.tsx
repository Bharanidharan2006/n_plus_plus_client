import { useAuthStore } from "@/stores/auth.store";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import {
  DMSerifDisplay_400Regular,
  useFonts as useDmSerif,
} from "@expo-google-fonts/dm-serif-display";
import {
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts as usePoppins,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider,
} from "urql";

const API_LINK = "http://10.204.219.239:5000/graphql";

const client = createClient({
  url: API_LINK,
  exchanges: [debugExchange, cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = SecureStore.getItem("accessToken");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
  preferGetMethod: false,
});

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_LINK }),
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  const setTokens = useAuthStore((state) => state.setTokens);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dmLoaded] = useDmSerif({
    "DMSerifDisplay-Regular": DMSerifDisplay_400Regular,
    // "DMSerifDisplay-Italic": DMSerifDisplay_400RegularItalic,
  });

  const [poppinsLoaded] = usePoppins({
    "Poppins-Thin": Poppins_100Thin,
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
  });

  useEffect(() => {
    const accessToken = SecureStore.getItem("accessToken");
    const refreshToken = SecureStore.getItem("refreshToken");
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      setLoggedIn(true);
    }
  }, []);

  if (!dmLoaded && !poppinsLoaded) return null;

  return (
    <>
      <StatusBar backgroundColor="#1d1d1d" translucent={false} style="light" />
      <Provider value={client}>
        <ApolloProvider client={apolloClient}>
          <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
            <Stack
              screenOptions={{ headerShown: false, gestureEnabled: false }}
            >
              {loggedIn ? (
                <Stack.Screen name="(app)/home" />
              ) : (
                <Stack.Screen name="(auth)/login" />
              )}
            </Stack>
          </View>
        </ApolloProvider>
      </Provider>
    </>
  );
}

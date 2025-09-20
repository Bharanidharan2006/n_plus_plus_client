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
import React from "react";
import { View } from "react-native";

const API_LINK = "http://10.11.140.103:5000/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: API_LINK }),
  cache: new InMemoryCache(),
});

export default function RootLayout() {
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

  if (!dmLoaded && !poppinsLoaded) return null;

  const userToken = false;

  return (
    <ApolloProvider client={client}>
      <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {userToken ? (
            <Stack.Screen name="(app)/home" />
          ) : (
            <Stack.Screen name="(auth)/login" />
          )}
        </Stack>
      </View>
    </ApolloProvider>
  );
}

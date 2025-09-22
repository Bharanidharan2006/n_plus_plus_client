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
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider,
} from "urql";

const API_LINK = "http://192.168.137.185:5000/graphql";

const client = createClient({
  url: API_LINK,
  exchanges: [debugExchange, cacheExchange, fetchExchange],
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
    <Provider value={client}>
      <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {userToken ? (
            <Stack.Screen name="(app)/home" />
          ) : (
            <Stack.Screen name="(auth)/login" />
          )}
        </Stack>
      </View>
    </Provider>
  );
}

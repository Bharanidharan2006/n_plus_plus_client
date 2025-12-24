import { useAuthStore } from "@/stores/auth.store";
import { NotificationProvider } from "@/utils/NotificationProvider";
import { shouldBeHandledByBGTask } from "@/utils/registerTask";
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
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider,
} from "urql";

const API_LINK = process.env.EXPO_PUBLIC_API_LINK || "";

console.log(API_LINK);

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

// Used to show notifications when the app is in foreground, the listeners are used when the app is in background.
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const categoryIdentifier = notification.request.content.data?.categoryId;
    if (shouldBeHandledByBGTask(categoryIdentifier)) {
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: false,
        shouldShowList: false,
      };
    }
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: false,
      shouldShowList: false,
    };
  },
});

function RootLayout() {
  const { loggedIn, setTokens, setLoggedIn } = useAuthStore((state) => state);
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
      <NotificationProvider>
        <StatusBar
          backgroundColor="#1d1d1d"
          translucent={false}
          style="light"
        />
        <Provider value={client}>
          <ApolloProvider client={apolloClient}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Protected guard={loggedIn}>
                <Stack.Screen name="(tabs)" />
              </Stack.Protected>
              <Stack.Protected guard={!loggedIn}>
                <Stack.Screen name="login" />
                <Stack.Screen name="forgot_password" />
              </Stack.Protected>
            </Stack>
          </ApolloProvider>
        </Provider>
      </NotificationProvider>
    </>
  );
}

export default RootLayout;

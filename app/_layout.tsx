import LoadingScreen from "@/components/LoadingScreen";
import { useAuthStore } from "@/stores/auth.store";
import { useLoadingStore } from "@/stores/loading.store";
import { loadingLink } from "@/utils/apolloLoadingLink";
import { NotificationProvider } from "@/utils/NotificationProvider";
import { shouldBeHandledByBGTask } from "@/utils/registerTask";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
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
import { Stack, useRootNavigationState } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
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
    const token = useAuthStore.getState().accessToken;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
  preferGetMethod: false,
});

const apolloClient = new ApolloClient({
  link: from([loadingLink, new HttpLink({ uri: API_LINK })]),
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
  const navReady = useRootNavigationState();
  const { isLoading, setLoading } = useLoadingStore((state) => state);

  // useEffect(() => {
  //   if (apolloClient) {
  //     setApolloReady(true);
  //     console.log("apolloReady");
  //   }
  // }, [apolloClient]);

  // useEffect(() => {
  //   if (!!navReady?.key || !apolloReady) return;

  //   SplashScreen.hideAsync();
  //   setAppReady(true);
  //   console.log("appReady");
  //   // This error is ok since I always know that either targetRoute has null or a valid route.
  //   if (targetRoute) {
  //     router.replace(targetRoute);
  //   }
  // }, [navReady, apolloReady, targetRoute]);

  // useEffect(() => {
  //   if (navReady && apolloReady) {
  //     setAppReady(true);
  //   }
  // }, [navReady, apolloReady]);

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

  //Extra

  useEffect(() => {
    (async () => {
      try {
        let accessToken;
        let refreshToken;
        if (Platform.OS === "web") {
          accessToken = localStorage.getItem("accessToken");
          refreshToken = localStorage.getItem("refreshToken");
        } else {
          accessToken = await SecureStore.getItemAsync("accessToken");
          refreshToken = await SecureStore.getItemAsync("refreshToken");
        }
        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
          setLoggedIn(true);
        }
      } catch {}
    })();
  }, []);

  if (!dmLoaded || !poppinsLoaded) return null;

  return (
    <>
      <StatusBar backgroundColor="#1d1d1d" translucent={false} style="light" />
      <Provider value={client}>
        <ApolloProvider client={apolloClient}>
          <NotificationProvider>
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
            {isLoading && <LoadingScreen />}
          </NotificationProvider>
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default RootLayout;

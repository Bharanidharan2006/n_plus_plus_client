import { useAuthStore } from "@/stores/auth.store";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Used to fetch accessToken and refreshToken from the store and updates it in the useAuthStore

export const getUserToken = async () => {
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
      useAuthStore().setTokens(accessToken, refreshToken);
      useAuthStore().setLoggedIn(true);
    }
  } catch {}
};

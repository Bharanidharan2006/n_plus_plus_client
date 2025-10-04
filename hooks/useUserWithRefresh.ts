// hooks/useUserWithRefresh.ts
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { gql, useMutation, useQuery } from "urql";

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      email
      rollNo
      userName
      currentSemester
      role
      refreshTokenVersion
      createdAt
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

export const useUserWithRefresh = () => {
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshTokenStored = useAuthStore((state) => state.refreshToken);
  const setTokens = useAuthStore((state) => state.setTokens);

  const [{ data, error }, reexecuteQuery] = useQuery({
    query: GET_USER,
    context: {
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
    pause: !accessToken, // wait until token is available
  });

  const [, refreshToken] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    const handleUserQuery = async () => {
      if (data) {
        setUser(data.getUser);
        return;
      }

      if (error && error.message.includes("Access token expired")) {
        const response = await refreshToken({
          refreshToken: refreshTokenStored,
        });

        if (response.data) {
          const newAccessToken = response.data.refreshToken.accessToken;
          const newRefreshToken = response.data.refreshToken.refreshToken;

          await SecureStore.setItemAsync("accessToken", newAccessToken);
          await SecureStore.setItemAsync("refreshToken", newRefreshToken);

          setTokens(newAccessToken, newRefreshToken);

          // Re-fetch GET_USER with new token
          reexecuteQuery({
            requestPolicy: "network-only",
            context: {
              fetchOptions: {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              },
            },
          });
        } else {
          console.log("Refresh token failed", response.error);
        }
      }
    };

    handleUserQuery();
  }, [data, error]);

  return { user: data?.getUser, fetching: !data && !error };
};

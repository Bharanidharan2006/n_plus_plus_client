import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery } from "@apollo/client/react";
import { push } from "expo-router/build/global-state/routing";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GET_USER, REFRESH_TOKEN } from "../../(home)";

const PendingAttendanceSlot = ({ date }) => {
  console.log(date);

  const dateInMMDDYYYY: string = date
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");
  return (
    <TouchableOpacity
      onPress={() => push(`/(tabs)/attendance/mark/${dateInMMDDYYYY}`)}
    >
      <View style={styles.slotElement}>
        {/* en-GB gives the date in dd/mm/yyyy and the regex replaces '/' with '-' */}
        <Text style={styles.slotElementText}>{dateInMMDDYYYY}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PendingAttendanceIndex = () => {
  const { user, setUser } = useUserStore((state) => state);
  const { accessToken, setTokens, refreshToken } = useAuthStore(
    (state) => state
  );
  const { data, error, refetch } = useQuery(GET_USER, {
    variables: { token: accessToken },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
  const [
    getNewAccessToken,
    { data: newRefreshToken, loading, error: refreshTokenError },
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    try {
      const accessTokenStored = SecureStore.getItem("accessToken");
      const refreshTokenStored = SecureStore.getItem("refreshToken");
      setTokens(accessTokenStored ?? "", refreshTokenStored ?? "");
      refetch();
    } catch (e) {
      if (error?.message.includes("Access token expired.")) {
        getNewAccessToken({
          variables: { refreshToken: refreshToken },
        });
      }
    }
  }, []);

  // Code duplication - Separate the common functionality onto a single file.

  useEffect(() => {
    if (data) {
      setUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    if (newRefreshToken) {
      SecureStore.setItem(
        "refreshToken",
        newRefreshToken.refreshToken.refreshToken
      );
      SecureStore.setItem(
        "accessToken",
        newRefreshToken.refreshToken.accessToken
      );
      setTokens(
        newRefreshToken.refreshToken.accessToken,
        newRefreshToken.refreshToken.refreshToken
      );
      refetch();
    }
  }, [newRefreshToken]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Pending Attendance Updates</Text>
      <ScrollView style={styles.slotContainer}>
        {user?.pendingDates && user?.pendingDates.length == 0 ? (
          <Text>You are up to date</Text>
        ) : (
          user?.pendingDates?.map((date) => (
            <TouchableOpacity key={Math.random()}>
              <PendingAttendanceSlot date={new Date(date)} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  pageTitle: {
    color: "#19aa59",
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
  },
  slotContainer: {
    marginTop: 30,
  },
  slotElement: {
    backgroundColor: "#272727",
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  slotElementText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 20,
  },
});

export default PendingAttendanceIndex;

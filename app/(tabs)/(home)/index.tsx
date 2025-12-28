import BarChart from "@/components/BarChart";
import TimeTable from "@/components/TimeTable";
import { useAuthStore } from "@/stores/auth.store";
import { useTimeTableStore } from "@/stores/timeTable.store";
import { useUserStore } from "@/stores/user.store";
import {
  GetAttendancePercentageQuery,
  GetAttendancePercentageQueryVariables,
  GetLatestWeekQuery,
  GetUserQuery,
  GetUserQueryVariables,
  MarkAttendanceFromNotificationMutation,
  MarkAttendanceFromNotificationMutationVariables,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  UpdatePushNotificationTokenMutation,
  UpdatePushNotificationTokenMutationVariables,
  Week,
} from "@/types/__generated__/graphql";
import { subjectCodeMap } from "@/types/helpers";
import { getStorageItemSync, removeItemSync } from "@/utils/storage";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const GET_USER: TypedDocumentNode<
  GetUserQuery,
  GetUserQueryVariables
> = gql`
  query GetUser($token: String!) {
    getUser(token: $token) {
      id
      email
      rollNo
      userName
      currentSemester
      role
      notificationToken
      phoneNo
      refreshTokenVersion
      createdAt
      pendingDates
      gender
      dob
    }
  }
`;

const UPDATE_PUSH_NOTIFICATION_TOKEN: TypedDocumentNode<
  UpdatePushNotificationTokenMutation,
  UpdatePushNotificationTokenMutationVariables
> = gql`
  mutation UpdatePushNotificationToken(
    $rollNo: Float!
    $notificationToken: String!
  ) {
    updatePushNotificationToken(
      rollNo: $rollNo
      notificationToken: $notificationToken
    )
  }
`;

const MARK_ATTENDANCE_FROM_NOTIFICATION: TypedDocumentNode<
  MarkAttendanceFromNotificationMutation,
  MarkAttendanceFromNotificationMutationVariables
> = gql`
  mutation MarkAttendanceFromNotification($actionId: String!) {
    markAttendanceFromNotification(actionId: $actionId)
  }
`;

export const REFRESH_TOKEN: TypedDocumentNode<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
> = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const GET_WEEK_SCHEDULE: TypedDocumentNode<
  GetLatestWeekQuery,
  GetUserQueryVariables
> = gql`
  query GetLatestWeek {
    getLatestWeek {
      id
      weekNo
      createdAt
      timeTable
      saturdayStatus
      startDate
      endDate
    }
  }
`;

export const GET_ATTENDANCE_PERCENTAGE: TypedDocumentNode<
  GetAttendancePercentageQuery,
  GetAttendancePercentageQueryVariables
> = gql`
  query GetAttendancePercentage($rollNo: Float!) {
    getAttendancePercentage(rollNo: $rollNo) {
      attendance {
        attendancePercentage
      }
      subjectDetails {
        subjectCode
      }
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const accessToken = useAuthStore.getState().accessToken;
  const refreshTokenStored = useAuthStore((state) => state.refreshToken);
  const setTokens = useAuthStore((state) => state.setTokens);
  const [week, setWeek] = useState<Week | null>(null);
  const [notificationToken, setNotificationToken] = useState("");
  const setTimeTable = useTimeTableStore((state) => state.setTimeTable);
  const setSaturdayStatus = useTimeTableStore(
    (state) => state.setSaturdayStatus
  );
  const setId = useTimeTableStore((state) => state.setId);

  const [attendanceReport, setAttendanceReport] = useState<
    {
      attendancePercentage: number;
      shortenedName: string;
    }[]
  >([]);

  const {
    data,
    error,
    loading: userLoading,
    refetch,
  } = useQuery(GET_USER, {
    variables: { token: accessToken },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
  const {
    data: weekData,
    error: weekError,
    loading: scheduleLoading,
  } = useQuery(GET_WEEK_SCHEDULE, {
    variables: { token: accessToken },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
  const {
    data: attendancePercentageData,
    error: attendancePercentageError,
    loading: attendancePercentageLoading,
    refetch: attendancePercentageRefetch,
  } = useQuery(GET_ATTENDANCE_PERCENTAGE, {
    variables: { rollNo: user?.rollNo ? user.rollNo : 0 },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
  const [
    getNewAccessToken,
    {
      data: newRefreshToken,
      loading: refreshTokenLoading,
      error: refreshTokenError,
    },
  ] = useMutation(REFRESH_TOKEN);
  const [updatePushNotificationToken, { data: isTokenUpdated }] = useMutation(
    UPDATE_PUSH_NOTIFICATION_TOKEN,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const [markAttendanceFromNotification] = useMutation(
    MARK_ATTENDANCE_FROM_NOTIFICATION
  );
  // const [{ data, error, fetching }, reexecuteQuery] = useQuery({
  //   query: GET_USER,
  //   variables: { token: accessToken },
  //   // context: {
  //   //   fetchOptions: {
  //   //     method: "POST",
  //   //   },
  //   // },
  //   context: {
  //     fetchOptions: {
  //       headers: {
  //         "x-apollo-operation-name": "GetUser",
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   },

  //   //pause: true, // wait until token is available
  // });

  //const [, refreshToken] = useMutation(REFRESH_TOKEN);

  // Effect to handle token refresh if query fails
  //console.log(data);

  const getExpoPushToken = async () => {
    if (Platform.OS === "web") return;
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setNotificationToken(token);
  };

  useEffect(() => {
    if (data) {
      setUser(data.getUser);
      attendancePercentageRefetch();
      if (Platform.OS !== "web") {
        getExpoPushToken();
        const response = Notifications.getLastNotificationResponse();
        if (response?.actionIdentifier === "NO") {
          router.replace("/(tabs)/attendance/mark");
        }
      }
    }

    if (weekData) {
      setWeek(weekData.getLatestWeek);
      setTimeTable(weekData.getLatestWeek.timeTable);
      setSaturdayStatus(weekData.getLatestWeek.saturdayStatus);
      setId(weekData.getLatestWeek.id);
      console.log(weekData);
    }
    if (attendancePercentageData) {
      const modifiedAttendanceReport =
        attendancePercentageData.getAttendancePercentage.map((record) => {
          return {
            attendancePercentage: record.attendance.attendancePercentage,
            shortenedName: subjectCodeMap[record.subjectDetails.subjectCode],
          };
        });
      setAttendanceReport(modifiedAttendanceReport);
    }
  }, [data, weekData, attendancePercentageData]);

  //When the user data has been fetched successfully, we will call the getExpoPushToken function so it will change the notificationToken state

  useEffect(() => {
    if (Platform.OS === "web") return;
    if (notificationToken && user) {
      if (notificationToken !== user.notificationToken) {
        updatePushNotificationToken({
          variables: {
            rollNo: user.rollNo,
            notificationToken: notificationToken,
          },
        });
      }
    }
  }, [notificationToken]);

  useEffect(() => {
    (async () => {
      if (newRefreshToken) {
        Platform.OS === "web"
          ? typeof localStorage !== "undefined"
            ? localStorage.setItem(
                "accessToken",
                newRefreshToken.refreshToken.accessToken
              )
            : null
          : await SecureStore.setItemAsync(
              "accessToken",
              newRefreshToken.refreshToken.accessToken
            ); //

        Platform.OS === "web"
          ? typeof localStorage !== "undefined"
            ? localStorage.setItem(
                "refreshToken",
                newRefreshToken.refreshToken.refreshToken
              )
            : null
          : await SecureStore.setItemAsync(
              "refreshToken",
              newRefreshToken.refreshToken.refreshToken
            );

        setTokens(
          newRefreshToken.refreshToken.accessToken,
          newRefreshToken.refreshToken.refreshToken
        );
        refetch();
      }
    })();

    if (refreshTokenError) console.log(refreshTokenError);
  }, [newRefreshToken, refreshTokenError]);

  useEffect(() => {
    console.log(refreshTokenStored);

    if (error?.message.includes("Access token expired.")) {
      getNewAccessToken({
        variables: { refreshToken: refreshTokenStored },
      });
    }
    if (weekError) {
      console.log(weekError);
    }
  }, [error, weekError]);

  const sendPendingAttendances = async (notificationLogs: any) => {
    if (Platform.OS === "web") return;

    // [ ] - TODO
    //Currently catching errors and removing pending actions as a whole instead of sending request and removing one by one. Need to find a better way.
    try {
      for (const log of notificationLogs) {
        if (log.source === "ATTENDANCE_ACTIONS_RESPONSE_RECEIVED") {
          const actionId = JSON.parse(
            log.data.notification.request.content.dataString
          ).actionId;

          console.log(actionId);

          await markAttendanceFromNotification({
            variables: {
              actionId: actionId,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
    removeItemSync();
  };

  // useEffect that runs on component mount to send the pending notifications
  // Todo: // make sure to catch the errors correctly
  useEffect(() => {
    if (Platform.OS === "web") return;
    const notificationLogs = JSON.parse(getStorageItemSync() ?? "[]");
    sendPendingAttendances(notificationLogs);
  }, []);

  // if (fetching) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ ...styles.title, color: "#fff" }}>Hi,</Text>
          <TouchableOpacity>
            <Text style={{ ...styles.title, color: "#19AA59" }}>
              {user?.userName || "Loading..."}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.attendanceTitle}>
          Attendance Percentage Overview:
        </Text>
        {attendanceReport ? <BarChart subjects={attendanceReport} /> : <></>}

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/(tabs)/attendance/record")}
        >
          <Text style={styles.buttonText}>View Attendance Record</Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ ...styles.attendanceTitle, flex: 0.75 }}>
            Week's Schedule:
          </Text>
          <TouchableOpacity
            style={{
              display: user && user.role === "Representative" ? "flex" : "none",
            }}
            onPress={() => {
              router.push("/(tabs)/(home)/edit_timetable");
            }}
          >
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {week ? (
          <TimeTable timeTable={week?.timeTable} />
        ) : (
          <Text>Loading</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1D",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: { fontFamily: "DMSerifDisplay-Regular", fontSize: 30 },
  button: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#19AA59",
    marginTop: 55,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "DMSerifDisplay-Regular",
  },
  attendanceTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    color: "#fff",
  },
});

export default Home;

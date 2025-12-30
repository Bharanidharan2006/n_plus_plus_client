import DayTimeTableUpdate from "@/components/DayTimeTableUpdate";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import {
  GetScheduleByDateQuery,
  GetScheduleByDateQueryVariables,
  UpdateDailyAttendanceMutation,
  UpdateDailyAttendanceMutationVariables,
} from "@/types/__generated__/graphql";
import { dayMapFullInverse } from "@/types/helpers";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const GET_SCHEDULE_BY_DATE: TypedDocumentNode<
  GetScheduleByDateQuery,
  GetScheduleByDateQueryVariables
> = gql`
  query GetScheduleByDate($date: DateTime!) {
    getScheduleByDate(date: $date)
  }
`;

export const UPDATE_DAILY_ATTENDANCE: TypedDocumentNode<
  UpdateDailyAttendanceMutation,
  UpdateDailyAttendanceMutationVariables
> = gql`
  mutation UpdateDailyAttendance($input: UpdateDailyAttendanceDto!) {
    updateDailyAttendance(input: $input)
  }
`;

const parseDate = (date: any): Date => {
  const [dd, mm, yyyy] = date.split("-").map(Number);
  console.log(yyyy, mm - 1, dd);
  return new Date(yyyy, mm - 1, dd);
};

const getISTDateAsUTCMidnight = (baseDate: Date = new Date()): Date => {
  const istDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(baseDate);

  // Force UTC midnight for the IST calendar date
  return new Date(`${istDate}T00:00:59.000Z`);
};

function formatDDMMYYYY(date: any) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

const UpdatePendingAttendance = () => {
  const { date } = useLocalSearchParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [attendance, setAttendance] = useState<boolean[]>(Array(8).fill(true));
  const [schedule, setSchedule] = useState<string[]>([]);
  const { data, error } = useQuery(GET_SCHEDULE_BY_DATE, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: {
      date: getISTDateAsUTCMidnight(parseDate(date)),
    },
  });
  const dateObj = parseDate(date);
  //Remove this after moving to indian servers
  const [
    updateAttendance,
    { data: updateAttendanceResponse, error: updateAttendanceError },
  ] = useMutation(UPDATE_DAILY_ATTENDANCE, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: {
      input: {
        date: formatDDMMYYYY(parseDate(date)), //This works chill
        attendanceData: attendance,
        rollNo: user ? user.rollNo : 0,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setSchedule(data.getScheduleByDate);
    }
  }, [data]);

  const isSameDate = (dt1: any, dt2: Date) => {
    const d1 = new Date(dt1);
    return (
      d1.getFullYear() === dt2.getFullYear() &&
      d1.getMonth() === dt2.getMonth() &&
      d1.getDate() === dt2.getDate()
    );
  };

  useEffect(() => {
    if (updateAttendanceResponse) {
      if (updateAttendanceResponse.updateDailyAttendance === true) {
        if (user) {
          let newPendingDates = user.pendingDates.filter(
            (d) => !isSameDate(d, dateObj)
          );
          setUser({ ...user, pendingDates: newPendingDates });
        }
        router.back();
      }
    }

    if (updateAttendanceError) console.log(updateAttendanceError);
  }, [updateAttendanceResponse, updateAttendanceError]);

  const handleUpdateAttendance = async () => {
    await updateAttendance();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>{date}</Text>
      <DayTimeTableUpdate
        periods={schedule}
        day={dayMapFullInverse.get(dateObj.getDay())}
        updateAttendance={setAttendance}
      />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleUpdateAttendance}
      >
        <Text style={styles.actionButtonText}>Update Attendance</Text>
      </TouchableOpacity>
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendSection}>
          <View
            style={[styles.legendSectionSquare, { backgroundColor: "#19AA59" }]}
          ></View>
          <Text style={styles.legendSectionText}>Present</Text>
        </View>
        <View style={styles.legendSection}>
          <View
            style={[styles.legendSectionSquare, { backgroundColor: "#fff" }]}
          />
          <Text style={styles.legendSectionText}>Absent</Text>
        </View>
      </View>
      <Text
        style={[
          styles.legendSectionText,
          {
            marginTop: 10,
            paddingHorizontal: 10,
          },
        ]}
      >
        *Click on the blocks to update attendance status.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 20,
  },
  pageTitle: {
    color: "#19aa59",
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
  },
  actionButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#19aa59",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "DMSerifDisplay-Regular",
  },
  legendContainer: {
    marginTop: 30,
  },
  legendTitle: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
    color: "#fff",
    marginBottom: 15,
  },
  legendSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  legendSectionSquare: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  legendSectionText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
});

export default UpdatePendingAttendance;

import AttendanceEntry from "@/components/AttendanceEntry";
import ProgressCircle from "@/components/ProgressCircle";
import { useAuthStore } from "@/stores/auth.store";
import { useSubjectStore } from "@/stores/subject.store";
import { useUserStore } from "@/stores/user.store";
import {
  GetAttendanceRecordQuery,
  GetAttendanceRecordQueryVariables,
} from "@/types/__generated__/graphql";
import { monthMap } from "@/types/helpers";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GET_ATTENDANCE_RECORD: TypedDocumentNode<
  GetAttendanceRecordQuery,
  GetAttendanceRecordQueryVariables
> = gql`
  query GetAttendanceRecord($rollNo: Float!, $subjectId: String!) {
    getAttendanceRecord(rollNo: $rollNo, subjectId: $subjectId) {
      id
      semesterId
      studentRollNo
      subjectId
      totalContactHours
      attendedContactHours
      attendancePercentage
      attendanceRecords {
        date
        periods
        monthNumber
        isUpdated
        attended
      }
    }
  }
`;

const AttendanceRecord = () => {
  const { id } = useLocalSearchParams();
  const subject = useSubjectStore((state) => state.currentSubject);
  const user = useUserStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [attendanceRecordMap, setAttendanceRecordMap] = useState<
    Map<number, any>
  >(new Map());
  const [attendanceRecordStatus, setAttendanceRecordStatus] = useState(false);
  const [missedContactHours, setMissedContactHours] = useState(0);
  const [noOfBunkableContactHours, setNoofBunkableContactHours] = useState(0);

  const { data, error } = useQuery(GET_ATTENDANCE_RECORD, {
    variables: { rollNo: user?.rollNo ? user.rollNo : 0, subjectId: id },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  useEffect(() => {
    const attendanceRecord = new Map();
    if (data?.getAttendanceRecord?.attendanceRecords) {
      data?.getAttendanceRecord.attendanceRecords.forEach((record) => {
        if (
          !attendanceRecord.has(record?.monthNumber ? record.monthNumber : -1)
        ) {
          attendanceRecord.set(
            record?.monthNumber ? record.monthNumber : -1,
            []
          );
        }
        const dayRecord = {
          date: record?.date,
          attended: record?.attended,
          isUpdated: record?.isUpdated,
          periods: record?.periods,
        };
        attendanceRecord
          .get(record?.monthNumber ? record.monthNumber : -1)
          .push(dayRecord);
      });
      setAttendanceRecordMap(attendanceRecord);
      setAttendanceRecordStatus(true);
      setNoofBunkableContactHours(
        (subject ? subject.contactHoursPerWeek : 0) * 15 * 0.25
      );
      setMissedContactHours(
        data.getAttendanceRecord.attendedContactHours &&
          data.getAttendanceRecord.totalContactHours
          ? data.getAttendanceRecord.totalContactHours -
              data.getAttendanceRecord.attendedContactHours
          : 0
      );
    }
    console.log(error);
  }, [data, error]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.subjectBox}>
          <Text style={styles.subjectTitle}>{subject?.subjectTitle}</Text>
          <Text style={styles.subjectCode}>{`(${subject?.subjectCode})`}</Text>
        </View>
        <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={25}
            color="white"
            style={{ marginRight: 3 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hours */}
        <View style={styles.row}>
          <View style={[styles.card, { marginRight: 8 }]}>
            <Text style={styles.cardLabel}>Total Hours</Text>
            <Text style={styles.cardValue}>
              {data && data.getAttendanceRecord?.totalContactHours}
            </Text>
          </View>
          <View style={[styles.card, { marginLeft: 8 }]}>
            <Text style={styles.cardLabel}>Attended</Text>
            <Text style={styles.cardValue}>
              {data && data.getAttendanceRecord?.attendedContactHours}
            </Text>
          </View>
        </View>

        {/* Attendance % */}
        <View style={styles.attendanceBox}>
          <View style={styles.attendanceRow}>
            <View>
              <Text style={styles.cardLabel}>Attendance</Text>
              <Text style={styles.attendancePercent}>
                {data &&
                  (data.getAttendanceRecord?.attendancePercentage === 0.0
                    ? data.getAttendanceRecord?.attendancePercentage?.toPrecision(
                        2
                      )
                    : data.getAttendanceRecord?.attendancePercentage?.toPrecision(
                        4
                      ))}
              </Text>
            </View>
            {/* Placeholder circle */}
            <ProgressCircle
              strokeWidth={4}
              radius={50}
              percentage={
                data &&
                (data.getAttendanceRecord?.attendancePercentage === 0.0
                  ? data.getAttendanceRecord?.attendancePercentage?.toPrecision(
                      2
                    )
                  : data.getAttendanceRecord?.attendancePercentage?.toPrecision(
                      4
                    ))
              }
            />
          </View>
          <Text style={styles.attendanceNote}>
            You can miss{" "}
            <Text style={styles.attendanceHighlight}>{`${
              Math.floor(noOfBunkableContactHours) - missedContactHours < 0
                ? "no more"
                : Math.floor(noOfBunkableContactHours) - missedContactHours
            } more classes`}</Text>{" "}
            to maintain 75% attendance.
          </Text>
        </View>

        {/* History */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>History</Text>
        </View>

        {attendanceRecordStatus &&
          [...attendanceRecordMap.entries()].map(([monthNumber, records]) => (
            <React.Fragment key={monthNumber}>
              <Text style={styles.historyMonth}>
                {monthMap[Number(monthNumber)]}
              </Text>
              {records.map((record, i) => (
                <AttendanceEntry
                  key={`${record.date}-${i}`}
                  date={record.date}
                  periods={record.periods}
                  attended={record.attended}
                  isUpdated={record.isUpdated}
                />
              ))}
            </React.Fragment>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1D",
    padding: 20,
    paddingBottom: 0,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: StatusBar.currentHeight, // Make it dynamic
    left: 0,
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 100,
    backgroundColor: "#1d1d1d",
    paddingVertical: 5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#2D2D2D",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subjectBox: {
    marginBottom: 10,
    width: "80%",
  },
  subjectTitle: {
    fontSize: 26,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#ffffff",
  },
  subjectCode: {
    fontSize: 26,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19AA59",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#272727",
    borderRadius: 5,
    padding: 16,
  },
  cardLabel: {
    fontSize: 13,
    color: "gray",
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  cardValue: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  attendanceBox: {
    backgroundColor: "#272727",
    padding: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  attendancePercent: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: "#19AA59",
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#19AA59",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  attendanceNote: {
    fontSize: 13,
    color: "gray",
    fontFamily: "Poppins-Regular",
  },
  attendanceHighlight: {
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  historyMonth: {
    fontSize: 16,
    color: "#19AA59",
    fontFamily: "Poppins-Regular",
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
    color: "#19AA59",
    flex: 0.75,
  },
  backIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#272727",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});

export default AttendanceRecord;

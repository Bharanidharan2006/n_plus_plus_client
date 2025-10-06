import CustomPicker from "@/components/Picker";
import TimeTableSlotEditable from "@/components/TimeTableSlotEditable";
import { useAuthStore } from "@/stores/auth.store";
import { useSubjectStore } from "@/stores/subject.store";
import { useTimeTableStore } from "@/stores/timeTable.store";
import {
  GetSubjectDetailsQuery,
  GetSubjectDetailsQueryVariables,
} from "@/types/__generated__/graphql";
import { dayMapFull } from "@/types/helpers";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GET_SUBJECT_DETAILS: TypedDocumentNode<
  GetSubjectDetailsQuery,
  GetSubjectDetailsQueryVariables
> = gql`
  query GetSubjectDetails {
    getSubjectDetails {
      id
      subjectCode
      subjectTitle
      contactHoursPerWeek
    }
  }
`;

const EditTimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [currDayTimeTable, setCurrDayTimeTable] = useState<string[]>([]);
  const [chunks, setChunks] = useState<string[][]>();
  const subjects = useSubjectStore((state) => state.subjects);
  const setSubjects = useSubjectStore((state) => state.setSubjects);
  const accessToken = useAuthStore((state) => state.accessToken);
  const timeTable = useTimeTableStore((state) => state.timeTable);

  const { data } = useQuery(GET_SUBJECT_DETAILS, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setSubjects(data.getSubjectDetails);
    }
  }, [data, setSubjects]);

  useEffect(() => {
    let chunkedPeriods = [];
    for (let i = 0; i < timeTable.length; i += 8) {
      chunkedPeriods.push(timeTable.slice(i, i + 8));
    }
    setChunks(chunkedPeriods);
  }, [timeTable]);

  useEffect(() => {
    const dayNumber = dayMapFull.get(selectedDay) ?? 1;
    if (!chunks || chunks.length === 0) {
      setCurrDayTimeTable(Array(8).fill(""));
      return;
    }
    const chunk = chunks[dayNumber - 1];
    // if (!chunk) {
    //   setCurrDayTimeTable(Array(8).fill(""));
    //   return;
    // }
    // const filled =
    //   chunk.length === 8
    //     ? chunk
    //     : [...chunk, ...Array(8 - chunk.length).fill("")];
    setCurrDayTimeTable(chunk);
    //console.log(currDayTimeTable);
  }, [selectedDay, chunks]);

  return (
    <SafeAreaView style={{ ...styles.modalContainer }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>TimeTable Editor</Text>
        <TouchableOpacity style={styles.backIcon}>
          <Ionicons name="close" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <CustomPicker
          items={[
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
          ]}
          selectedValue={selectedDay}
          onValueChange={(val) => setSelectedDay(val)}
          hideIcon={false}
        />
        <View style={styles.dayContainer}>
          <View style={styles.timeTableRow}>
            {currDayTimeTable.map((period, i) => (
              <TimeTableSlotEditable
                key={`${selectedDay}-${i}-${Math.random() * 150}`}
                index={i}
                dayNumber={dayMapFull.get(selectedDay)}
                periodCode={period}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditTimeTable;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    flex: 1,
    backgroundColor: "#1D1D1D",
    zIndex: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
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
  },
  backIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#272727",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dayTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "DMSerifDisplay-Regular",
  },
  dayContainer: {
    backgroundColor: "#262626",
    alignSelf: "center",
    marginVertical: 12.5,
    borderRadius: 10,
    padding: 20,
    width: "95%",
    marginTop: 40,
  },
  timeTableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

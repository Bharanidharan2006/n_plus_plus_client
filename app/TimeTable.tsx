import DayTimeTable from "@/components/DayTimeTable";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const periods = [
  "Math",
  "Phy",
  "Chem",
  "English",
  "Bio",
  "Cs",
  "History",
  "Free",

  "Math",
  "Chem",
  "English",
  "Phy",
  "Cs",
  "Bio",
  "Free",
  "History",

  "English",
  "Math",
  "Cs",
  "Bio",
  "Phy",
  "Chem",
  "History",
  "Free",

  "Cs",
  "English",
  "Math",
  "Chem",
  "Bio",
  "Phy",
  "Free",
  "History",

  "Math",
  "Cs",
  "English",
  "Bio",
  "Chem",
  "Phy",
  "History",
  "Free",
];
const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const attendance = [
  1,
  1,
  0,
  -1,
  1,
  0,
  1,
  -1, // Day 1
  1,
  0,
  1,
  1,
  -1,
  1,
  0,
  1, // Day 2
  0,
  -1,
  1,
  0,
  1,
  1,
  -1,
  1, // Day 3
  1,
  1,
  0,
  1,
  -1,
  0,
  1,
  1, // Day 4
  1,
  -1,
  0,
  1,
  1,
  1,
  0,
  -1, // Day 5
];

const TimeTable = () => {
  const chunkedAttendance: any[] = [];
  for (let i = 0; i < attendance.length; i += 8) {
    chunkedAttendance.push(attendance.slice(i, i + 8));
  }

  const chunkedPeriods = [];
  for (let i = 0; i < periods.length; i += 8) {
    chunkedPeriods.push(periods.slice(i, i + 8));
  }

  let free = 0;
  periods.forEach((per) => {
    if (per === "Free") {
      free++;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.weekTitle}>Week One</Text>
      <Text style={styles.weekSubTitle}>
        Duration{"      :"} 12/08/2025 - 18/08/2025
      </Text>
      <Text style={styles.weekSubTitle}>No of hours : {40 - free}/40</Text>
      <ScrollView style={{ marginTop: 10 }}>
        {chunkedPeriods.map((period, i) => {
          return (
            <DayTimeTable
              key={Math.random()}
              periods={period}
              attendance={chunkedAttendance[i]}
              day={day[i]}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D1D1D",
    flex: 1,
    justifyContent: "center",
  },
  weekTitle: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    width: "95%",
    alignSelf: "center",
    paddingLeft: 5,
    marginTop: 15,
    marginBottom: 3,
  },
  weekSubTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#fff",
    opacity: 0.8,
    width: "95%",
    alignSelf: "center",
    paddingLeft: 5,
  },
});

export default TimeTable;

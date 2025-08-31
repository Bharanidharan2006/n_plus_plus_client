import DayTimeTable from "@/components/DayTimeTable";
import { useFonts } from "expo-font";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const customFonts = {
  "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
};

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

const Index = () => {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }

  const chunkedAttendance: any[] = [];
  for (let i = 0; i < attendance.length; i += 8) {
    chunkedAttendance.push(attendance.slice(i, i + 8));
  }

  const chunkedPeriods = [];
  for (let i = 0; i < periods.length; i += 8) {
    chunkedPeriods.push(periods.slice(i, i + 8));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
  scrollContainer: {
    alignItems: "center",
    width: "100%",
  },
  dayTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  dayContainer: {
    height: 245,
    width: "95%",
    backgroundColor: "#262626",
    alignSelf: "center",
    marginVertical: 12.5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  timeTableRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 25,
    position: "relative",
  },
  timeTableSlot: {
    height: 30,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B3B3B",
    borderRadius: 5,
  },
  timeTableSlotText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
});

export default Index;

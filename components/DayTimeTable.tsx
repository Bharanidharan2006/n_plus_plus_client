import { subjectCodeMap } from "@/types/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TimeTableSlot = ({ period }) => {
  let color = period === "" ? "#19AA59" : "#1d1d1d";

  return (
    <View style={[styles.ttSlotContainer, { backgroundColor: color }]}>
      <Text style={styles.timeTableSlotText}>
        {period ? subjectCodeMap[period] : "Free"}
      </Text>
    </View>
  );
};

const DayTimeTable = ({ periods, day }) => {
  return (
    <View style={styles.dayContainer}>
      <Text
        style={{ ...styles.dayTitle, textAlign: "center", marginBottom: 15 }}
      >
        {day}
      </Text>
      <View style={styles.timeTableRow}>
        {periods.map((period, i) => (
          <TimeTableSlot key={i} period={period} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  timeTableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ttSlotContainer: {
    height: 40,
    width: "23%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  timeTableSlotText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
});

export default DayTimeTable;

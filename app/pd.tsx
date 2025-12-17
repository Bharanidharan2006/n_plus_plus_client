import DayTimeTableUpdate from "@/components/DayTimeTableUpdate";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const parseDate = (date: any) => {
  const [dd, mm, yyyy] = date.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
};

const pd = () => {
  const { date } = useLocalSearchParams();
  const dateObj = parseDate("15-12-2025");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>{dateObj.toUTCString()}</Text>
      <DayTimeTableUpdate
        periods={["", "CS23301", "CS23301", "CS23302", "", "", "", "CS23304"]}
        day={"Monday"}
      />
      <TouchableOpacity style={styles.actionButton}>
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

export default pd;

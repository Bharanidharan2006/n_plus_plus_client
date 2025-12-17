import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PendingAttendanceSlot = ({ date }) => {
  return (
    <View style={styles.slotElement}>
      {/* en-GB gives the date in dd/mm/yyyy and the regex replaces '/' with '-' */}
      <Text style={styles.slotElementText}>
        {date.toLocaleDateString("en-GB").replace(/\//g, "-")}
      </Text>
    </View>
  );
};

const PendingAttendanceIndex = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Pending Attendance Updates</Text>
      <View style={styles.slotContainer}>
        <TouchableOpacity>
          <PendingAttendanceSlot date={new Date()} />
        </TouchableOpacity>
        <TouchableOpacity>
          <PendingAttendanceSlot date={new Date()} />
        </TouchableOpacity>
      </View>
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

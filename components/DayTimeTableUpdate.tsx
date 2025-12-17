import { subjectCodeMap } from "@/types/helpers";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TimeTableSlot = ({ period, pno }) => {
  const [bgColor, setBgColor] = useState("#1A1A1A");
  const [color, setColor] = useState("#fff");

  const nextColorStatus = () => {
    if (bgColor === "#1A1A1A") {
      setBgColor("#19AA59");
      setColor("#fff");
    } else if (bgColor === "#19AA59") {
      setBgColor("#fff");
      setColor("#000");
    } else {
      setBgColor("#1A1A1A");
      setColor("#fff");
    }
  };

  return (
    <TouchableOpacity
      disabled={period === ""}
      style={[styles.ttSlotContainer, { backgroundColor: bgColor }]}
      onPress={() => nextColorStatus()}
    >
      <Text style={[styles.timeTableSlotText, { color: color }]}>
        {pno + " - "}
        {period ? subjectCodeMap[period] : "Free"}
      </Text>
    </TouchableOpacity>
  );
};

const DayTimeTableUpdate = ({ periods, day }) => {
  return (
    <View style={styles.dayContainer}>
      <Text
        style={{ ...styles.dayTitle, textAlign: "center", marginBottom: 15 }}
      >
        {day}
      </Text>
      <View style={styles.timeTableRow}>
        {periods.map((period, i) => {
          return <TimeTableSlot period={period} key={i} pno={i + 1} />;
        })}
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
    marginBottom: 30,
    borderRadius: 5,
    padding: 20,
    width: "100%",
    marginTop: 30,
  },
  timeTableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ttSlotContainer: {
    height: 50,
    width: "45%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  timeTableSlotText: {
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});

export default DayTimeTableUpdate;

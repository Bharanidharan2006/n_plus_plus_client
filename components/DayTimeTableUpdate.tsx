import { subjectCodeMap } from "@/types/helpers";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TimeTableSlot = ({ period, pno, setAttendance, attendance }) => {
  const [bgColor, setBgColor] = useState("#19AA59");
  const [color, setColor] = useState("#fff");

  const nextColorStatus = () => {
    if (bgColor === "#19AA59") {
      attendance[pno - 1] = false;
      let newAttd = Array.from(attendance);
      setAttendance(newAttd);
      setBgColor("#fff");
      setColor("#000");
    } else {
      attendance[pno - 1] = true;
      let newAttd = Array.from(attendance);
      setAttendance(newAttd);
      setBgColor("#19AA59");
      setColor("#fff");
    }
  };

  return (
    <TouchableOpacity
      disabled={period === ""}
      style={[
        styles.ttSlotContainer,
        { backgroundColor: period === "" ? "#1A1A1A" : bgColor },
      ]}
      onPress={() => nextColorStatus()}
    >
      <Text
        style={[
          styles.timeTableSlotText,
          { color: period === "" ? "#fff" : color },
        ]}
      >
        {pno + " - "}
        {period ? subjectCodeMap[period] : "Free"}
      </Text>
    </TouchableOpacity>
  );
};

const DayTimeTableUpdate = ({ periods, day, updateAttendance }) => {
  const [attendance, setAttendance] = useState<boolean[]>(Array(8).fill(true));
  useEffect(() => {
    updateAttendance(attendance);
  }, [attendance]);

  return (
    <View style={styles.dayContainer}>
      <Text
        style={{ ...styles.dayTitle, textAlign: "center", marginBottom: 15 }}
      >
        {day}
      </Text>
      <View style={styles.timeTableRow}>
        {periods.map((period, i) => {
          return (
            <TimeTableSlot
              period={period}
              key={i}
              pno={i + 1}
              setAttendance={setAttendance}
              attendance={attendance}
            />
          );
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

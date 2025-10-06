import { useTimeTableStore } from "@/stores/timeTable.store";
import { subjectCodeMap, subjectNameMap } from "@/types/helpers";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomPicker from "./Picker";

const TimeTableSlotEditable = ({ periodCode, index, dayNumber }) => {
  // const [period, setPeriod] = useState();
  const changeSubject = useTimeTableStore((state) => state.changeSubject);
  const [selectedSubject, setSelectedSubject] = useState(
    periodCode === "" ? "Free" : subjectCodeMap[periodCode]
  );
  let color = periodCode === "" ? "#19AA59" : "#1d1d1d";

  let items = Object.entries(subjectCodeMap).map(([code, name]) => ({
    label: name,
    value: name,
  }));

  useEffect(() => {
    setSelectedSubject(subjectCodeMap[periodCode]);
  }, []);
  return (
    <View style={[styles.ttSlotContainer, { backgroundColor: color }]}>
      <CustomPicker
        items={[...items, { label: "Free", value: "Free" }]}
        selectedValue={selectedSubject}
        onValueChange={(val) => {
          setSelectedSubject(val);
          let indexToBeChanged = (dayNumber - 1) * 8 + index;
          const newSubjectCode = val === "Free" ? "" : subjectNameMap[val];
          changeSubject(indexToBeChanged, newSubjectCode);
        }}
        hideIcon={true}
      />
      <Text style={styles.timeTableSlotText}>{(index % 8) + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ttSlotContainer: {
    height: 50,
    width: "35%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
    position: "relative",
    marginLeft: 25,
  },
  timeTableSlotText: {
    position: "absolute",
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    left: -25,
    backgroundColor: "#19AA59",
    padding: 10,
    borderRadius: 5,
  },
});

export default TimeTableSlotEditable;

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomPicker from "./Picker";

const TimeTableSlotEditable = ({ period: p }) => {
  const [period, setPeriod] = useState(p);
  let color = period === "" ? "#19AA59" : "#1d1d1d";

  return (
    <View style={[styles.ttSlotContainer, { backgroundColor: color }]}>
      <CustomPicker
        items={[
          { Label: "Java", value: "fdf" },
          { Label: "Java", value: "fdf" },
        ]}
        selectedValue={"Java"}
        onValueChange={() => {}}
        hideIcon={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ttSlotContainer: {
    height: 40,
    width: "23%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  timeTableSlotText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
});

export default TimeTableSlotEditable;

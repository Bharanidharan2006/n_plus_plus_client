import DayTimeTable from "@/components/DayTimeTable";
import React from "react";
import { StyleSheet, View } from "react-native";

const day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimeTable = ({ timeTable: periods }) => {
  const chunkedPeriods = [];
  for (let i = 0; i < periods.length; i += 8) {
    chunkedPeriods.push(periods.slice(i, i + 8));
  }

  return (
    <View style={{ marginTop: 10 }}>
      {chunkedPeriods.map((period, i) => {
        return (
          <DayTimeTable key={Math.random()} periods={period} day={day[i]} />
        );
      })}
    </View>
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
    fontFamily: "Poppins-SemiBold",
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

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TimeTableSlot = ({ period, attendance }) => {
  let color = "";
  if (period === "Free") {
    color = "#087F87";
  } else if (attendance === -1) {
    color = "#B5300B";
  } else if (attendance === 0) {
    color = "#3B3B3B";
  } else if (attendance === 1) {
    color = "#08872B";
  }
  const styleTT = StyleSheet.create({
    ttSlotContainer: {
      height: 30,
      width: 70,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      borderRadius: 5,
      opacity: color != "#3B3B3B" ? 0.7 : 0.8,
    },
  });

  return (
    <>
      <View style={styleTT.ttSlotContainer}>
        <Text style={styles.timeTableSlotText}>{period}</Text>
      </View>
    </>
  );
};

const DayTimeTable = ({ periods, attendance, day }) => {
  return (
    <View style={styles.dayContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.dayTitle}>{day}</Text>
        <MaterialIcons name="edit" size={22} color="white" />
      </View>
      <View>
        <View style={styles.timeTableRow}>
          <View
            style={{
              position: "absolute",
              top: -20,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                opacity: 0.5,
                fontSize: 10,
                fontFamily: "Poppins-Regular",
              }}
            >
              08:30
            </Text>
            <Text
              style={{
                color: "#fff",
                opacity: 0.5,
                fontSize: 10,
                fontFamily: "Poppins-Regular",
              }}
            >
              12:15
            </Text>
          </View>
          {periods.map((period: any, i: number) => {
            if (i >= 0 && i <= 3) {
              return (
                <TimeTableSlot
                  period={period}
                  attendance={attendance[i]}
                  key={Math.random()}
                />
              );
            }
          })}
        </View>
        <Text
          style={{
            color: "#fff",
            opacity: 0.5,
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 500,
            marginBottom: 8,
            marginTop: 5,
            fontFamily: "Poppins-Medium",
          }}
        >
          ----- Lunch Break -----
        </Text>
        <View style={styles.timeTableRow}>
          <View
            style={{
              position: "absolute",
              top: -20,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                opacity: 0.5,
                fontSize: 10,
                fontFamily: "Poppins-Regular",
              }}
            >
              01:10
            </Text>
            <Text
              style={{
                color: "#fff",
                opacity: 0.5,
                fontSize: 10,
                fontFamily: "Poppins-Regular",
              }}
            >
              04:45
            </Text>
          </View>
          {periods.map((period, i) => {
            if (i >= 4 && i <= 7) {
              return (
                <TimeTableSlot
                  period={period}
                  attendance={attendance[i]}
                  key={Math.random()}
                />
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  timeTableSlotText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
});

export default DayTimeTable;

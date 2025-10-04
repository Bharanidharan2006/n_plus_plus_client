import { dayMap } from "@/types/helpers";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AttendanceEntry({
  date,
  periods,
  attended,
  isUpdated,
}) {
  const shortenedDay = dayMap[new Date(date).getDay()];
  const dayOfMonth = new Date(date).getDate();
  let needsSuffixZero = false;
  if (dayOfMonth <= 9) {
    needsSuffixZero = true;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{`${shortenedDay}, ${
          needsSuffixZero ? 0 : ""
        }${dayOfMonth}`}</Text>
        <Text style={styles.detail}>{`Periods: ${periods.toString()}`}</Text>
      </View>
      <View style={styles.icons}>
        {attended.map((s, i) =>
          s && isUpdated ? (
            <MaterialIcons
              key={i}
              name="check-circle"
              size={22}
              color="#19AA59"
            />
          ) : (
            <MaterialIcons key={i} name="cancel" size={22} color="gray" />
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#272727",
    padding: 16,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  date: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "white",
  },
  detail: {
    fontSize: 13,
    color: "gray",
    fontFamily: "Poppins-Regular",
  },
  icons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

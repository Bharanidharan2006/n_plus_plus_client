import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Action = ({ actionName, href }) => {
  return (
    <TouchableOpacity style={styles.action} onPress={() => push(`${href}`)}>
      <Text style={styles.actionText}>{actionName}</Text>
      <TouchableOpacity
        style={styles.actionNextBtn}
        onPress={() => push(`${href}`)}
      >
        <MaterialIcons name="navigate-next" size={30} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const AttendanceHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Attendance</Text>
      <View style={styles.actionContainer}>
        <Action
          actionName={"Subjectwise Attendance Record"}
          href={"/attendance/record"}
        />
        <Action actionName={"Mark Your Attendance"} href={"/attendance/mark"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1D1D1D",
  },
  pageTitle: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
    color: "#19AA59",
  },
  actionContainer: {
    marginTop: 20,
  },
  action: {
    backgroundColor: "#272727",
    borderRadius: 10,
    height: 70,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  actionText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
    flex: 0.8,
  },
  actionNextBtn: {
    height: 40,
    width: 40,
    backgroundColor: "#1D1D1D",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AttendanceHome;

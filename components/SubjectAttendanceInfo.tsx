import { useSubjectStore } from "@/stores/subject.store";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SubjectAttendanceInfo = ({
  subjectCode,
  subjectName,
  id,
  contactHoursPerWeek,
}) => {
  const setCurentSubject = useSubjectStore((state) => state.setCurrentSubject);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        const subject = {
          id,
          subjectCode,
          subjectTitle: subjectName,
          contactHoursPerWeek,
        };
        setCurentSubject(subject);
        router.navigate(`/(app)/attendance/${id}`);
      }}
    >
      <Text style={styles.subjectTitle}>{subjectName + " "}</Text>
      <Text style={{ ...styles.subjectTitle, color: "#19AA59" }}>
        {subjectCode}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#272727",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  subjectTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
});

export default SubjectAttendanceInfo;

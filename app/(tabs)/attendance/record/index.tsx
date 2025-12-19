import SubjectAttendanceInfo from "@/components/SubjectAttendanceInfo";
import { useAuthStore } from "@/stores/auth.store";
import {
  GetSubjectDetailsQuery,
  GetSubjectDetailsQueryVariables,
} from "@/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SubjectDetail = {
  id: string;
  subjectCode: string;
  subjectTitle: string;
  contactHoursPerWeek: number;
};

const GET_SUBJECT_DETAILS: TypedDocumentNode<
  GetSubjectDetailsQuery,
  GetSubjectDetailsQueryVariables
> = gql`
  query GetSubjectDetails {
    getSubjectDetails {
      id
      subjectCode
      subjectTitle
      contactHoursPerWeek
    }
  }
`;

const ChooseSubject = () => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [subjectDetails, setSubjectDetails] = useState<SubjectDetail[]>([]);
  const { data, error } = useQuery(GET_SUBJECT_DETAILS, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  useEffect(() => {
    if (data) {
      const modifiedSubjectDetails = data.getSubjectDetails.map((sub) => {
        const { __typename, ...details } = sub;
        return details;
      });
      setSubjectDetails(modifiedSubjectDetails);
    }
  }, [data]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Attendance Record</Text>
        <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={25}
            color="white"
            style={{ marginRight: 3 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {subjectDetails &&
          subjectDetails.map((sub) => (
            <SubjectAttendanceInfo
              subjectCode={sub.subjectCode}
              subjectName={sub.subjectTitle}
              contactHoursPerWeek={sub.contactHoursPerWeek}
              id={sub.id}
              key={sub.id}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1D",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
    color: "#19AA59",
  },
  backIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#272727",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChooseSubject;

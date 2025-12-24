import { useUserStore } from "@/stores/user.store";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PendingAttendanceSlot = ({ date }) => {
  console.log(date);

  const dateInMMDDYYYY: string = date
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");
  return (
    <TouchableOpacity
      onPress={() => push(`/(tabs)/attendance/mark/${dateInMMDDYYYY}`)}
    >
      <View style={styles.slotElement}>
        {/* en-GB gives the date in dd/mm/yyyy and the regex replaces '/' with '-' */}
        <Text style={styles.slotElementText}>{dateInMMDDYYYY}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PendingAttendanceIndex = () => {
  const { user, setUser } = useUserStore((state) => state);
  // const { data, error, refetch } = useQuery(GET_USER, {
  //   variables: { token: accessToken },
  //   context: {
  //     headers: {
  //       authorization: `Bearer ${accessToken}`,
  //     },
  //   },
  // });
  // useEffect(() => {
  //   if(!user){
  //     const accessToken = SecureStore.getItem("accessToken");
  //     const refreshToken = SecureStore.getItem("refreshToken");
  //   }
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Pending Attendance Updates</Text>
      <View style={styles.slotContainer}>
        {user?.pendingDates && user?.pendingDates.length == 0 ? (
          <Text>You are up to date</Text>
        ) : (
          user?.pendingDates?.map((date) => (
            <TouchableOpacity key={Math.random()}>
              <PendingAttendanceSlot date={new Date(date)} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  pageTitle: {
    color: "#19aa59",
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 26,
  },
  slotContainer: {
    marginTop: 30,
  },
  slotElement: {
    backgroundColor: "#272727",
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  slotElementText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 20,
  },
});

export default PendingAttendanceIndex;

import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LOGOUT: TypedDocumentNode = gql`
  mutation Logout($rollno: Float!) {
    logout(rollno: $rollno)
  }
`;

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const { accessToken, refreshToken } = useAuthStore((state) => state);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const getAvatar = (seed: string) =>
    `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(
      seed
    )}&&backgroundColor=1B1B1B`;

  const [logout, { data, error }] = useMutation(LOGOUT, {
    variables: { rollno: user?.rollNo },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const handleLogout = async () => {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } else {
      await SecureStorage.deleteItemAsync("accessToken");
      await SecureStorage.deleteItemAsync("refreshToken");
    }

    await logout();
    setLoggedIn(false);
    router.navigate("/login");
  };
  const avatar = getAvatar(user?.userName ? user.userName : "DefaultPerson"); // change with name
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileCard}>
          <View style={{ paddingHorizontal: 10 }}>
            <Image style={styles.avatarImage} source={{ uri: avatar }} />
          </View>

          <View style={styles.profileCardTextContainer}>
            <Text style={styles.profileCardText}>
              {(user && user.userName) || "USERNAME"}
            </Text>
            <Text style={styles.subtitleProfile}>
              {user ? user.rollNo : "202410XXXX"}
            </Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text
            style={[styles.profileInfo, { paddingTop: 20, paddingLeft: 20 }]}
          >
            Personal Info
          </Text>
          <View style={{ padding: 10, display: "flex", flex: 1 }}>
            <View style={styles.detailView}>
              <Ionicons
                name="mail-outline"
                size={24}
                style={styles.detailsIcon}
              />
              <Text style={styles.detailText}>{user ? user.email : ""}</Text>
            </View>

            <View style={styles.detailView}>
              <Ionicons
                name="phone-portrait-outline"
                size={24}
                color="white"
                style={styles.detailsIcon}
              />
              <Text style={styles.detailText}>
                {user ? user.phoneNo : "91363592345"}
              </Text>
            </View>

            <View style={styles.detailView}>
              <Ionicons
                name="school"
                size={24}
                style={[{ color: "#19aa59" }, styles.detailsIcon]}
              />
              {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Current Sem
                                </Text> */}
              <Text style={styles.detailText}>
                {user ? user.currentSemester : "3rd SEM"}
              </Text>
            </View>

            <View style={styles.detailView}>
              <MaterialIcons
                name="cake"
                size={24}
                style={[{ color: "#19aa59" }, styles.detailsIcon]}
              />
              <Text style={styles.detailText}>
                {user ? user.dob : "18-07-2007"}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  detailText: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    color: "#fff",
    paddingLeft: 20,
    flexShrink: 1,
  },
  detailView: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
  },
  detailsIcon: {
    justifyContent: "flex-start",
    paddingLeft: 15,
    color: "#19aa59",
  },
  profileCardTextContainer: {
    flex: 1,
    padding: 10,
  },
  profileInfo: {
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
    fontSize: 26,
  },
  button: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#19AA59",
    marginTop: 55,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "DMSerifDisplay-Regular",
  },

  avatarImage: {
    borderColor: "#19aa59",
    width: 80,
    height: 80,
    backgroundColor: "",
    borderRadius: 50,
    borderWidth: 2,
  },
  profileCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "hsla(120, 0%, 10%, 1)",
    borderRadius: 20,
    alignItems: "center",
    borderColor: "hsla(120 , 10% , 20% , 0.4)",
    borderWidth: 2,
  },
  detailsCard: {
    display: "flex",
    width: "100%",
    marginTop: 20,
    backgroundColor: "hsl(hsla(120, 0%, 10%, 1))",
    borderRadius: 20,
    borderColor: "hsla(120 , 5% , 20% , 0.4)",
    borderWidth: 2,
  },
  profileText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    padding: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 32,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 100,
    alignItems: "center",
    paddingVertical: 20,
  },
  subtitleProfile: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  profileCardText: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
    flex: 1,
    flexWrap: "wrap",
  },
});

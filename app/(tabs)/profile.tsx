import { ScrollView, StyleSheet } from "react-native";

import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const getAvatar = (seed: string) =>
    `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(
      seed
    )}`;
  const handleLogout = () => {
    setLoggedIn(false);
    router.navigate("/login");
  };
  const avatar = getAvatar(user?.userName ? user.userName : "defaultPerson"); // change with name
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.profileCard}>
            <View style={{ paddingHorizontal: 10 }}>
              <Image style={styles.avatarImage} source={{ uri: avatar }} />
            </View>
            <View style={styles.profileCardTextContainer}>
              <View style={{ display: "flex" }}>
                <Text style={styles.profileCardText}>
                  {(user && user.userName) ||
                    "USERNAME USERNAME USERNAME USERNAME USERNAME"}
                </Text>
              </View>

              <View>
                <Text style={styles.subtitleProfile}>
                  {user ? user.rollNo : "202410XXXX"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <Text style={styles.profileInfo}>Personal Info</Text>
            </View>
            <View style={{ padding: 10, display: "flex", flex: 1 }}>
              <View style={styles.detailView}>
                <View style={styles.detailsIcon}>
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={{ paddingLeft: 15 }}>
                  {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Mail
                                </Text> */}
                  <Text style={styles.detailText}>
                    {user ? user.email : "mkiwemdimuksith@gmail.com"}
                  </Text>
                </View>
              </View>

              <View style={styles.detailView}>
                <View style={styles.detailsIcon}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={24}
                    color="white"
                  />
                </View>
                <View style={{ paddingLeft: 15 }}>
                  {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Phone
                                </Text> */}
                  <Text style={styles.detailText}>
                    {user ? user.phoneNo : "91363592345"}
                  </Text>
                </View>
              </View>

              <View style={styles.detailView}>
                <View style={styles.detailsIcon}>
                  <Ionicons
                    name="school"
                    size={24}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={{ paddingLeft: 15 }}>
                  {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Current Sem
                                </Text> */}
                  <Text style={styles.detailText}>
                    {user ? user.currentSemester : "3rd SEM"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  detailText: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    color: "#fff",
    paddingVertical: 10,
  },
  detailView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },
  detailsIcon: { justifyContent: "flex-start", paddingLeft: 15 },
  profileCardTextContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  profileInfo: {
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
    fontSize: 26,
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
    display: "flex",
    flexDirection: "row",
    backgroundColor: "hsla(120, 5%, 10%, 1)",
    borderRadius: 20,
    alignItems: "center",
    borderColor: "hsla(120 , 10% , 20% , 0.4)",
    borderWidth: 2,
  },
  detailsCard: {
    display: "flex",
    width: "100%",
    marginTop: 20,
    backgroundColor: "hsl(hsla(120, 5%, 10%, 1))",
    borderRadius: 20,
    borderColor: "hsla(120 , 5% , 20% , 0.4)",
    borderWidth: 2,
  },
  profileText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    padding: 5,
  },
  profileHeader: {
    flexDirection: `row`,
    justifyContent: "space-evenly",
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
  contentWrapper: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#FFFFFF",
  },
  subtitleProfile: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  formWrapper: {
    width: "100%",
    marginTop: 30,
  },
  forgotWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#D1D5DB",
    textDecorationLine: "underline",
  },
  profileCardText: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
    flex: 1,
    flexWrap: "wrap",
  },
  accentTitle: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D2D2D",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputM: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#2D2D2D",
    fontFamily: "Poppins-Regular",
    color: "#FFF",
  },
  loginButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#19aa59",
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "DMSerifDisplay-Regular",
  },
  iconWrapper: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#FF4D4F",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
    marginLeft: 4,
  },
});
